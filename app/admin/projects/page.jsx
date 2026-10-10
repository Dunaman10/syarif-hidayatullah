"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { initialProjects } from "@/lib/mockData";
import ImageUpload from "@/components/ImageUpload";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(null);
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "web",
    tech_stack: "",
    image_url: "/portfolio/zentury.png",
    demo_url: "",
    github_url: "",
    order_index: 0,
  });

  const fetchProjects = async () => {
    setLoading(true);
    setDbError(null);

    if (!isSupabaseConfigured) {
      setProjects(initialProjects);
      setIsDbConnected(false);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) {
        console.warn("Supabase query error:", error);
        setDbError(error.message);
        // Fallback to local default data so page is never completely blank
        setProjects(initialProjects);
        setIsDbConnected(false);
      } else {
        setIsDbConnected(true);
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          // Table exists in DB but empty
          setProjects([]);
        }
      }
    } catch (err) {
      console.error(err);
      setDbError(err.message || "Failed to connect to Supabase");
      setProjects(initialProjects);
      setIsDbConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Seed default 16 projects directly into Supabase database
  const handleSeedDatabase = async () => {
    if (!isSupabaseConfigured) return;
    setSeeding(true);
    try {
      const projectsToInsert = initialProjects.map((p, idx) => ({
        title: p.title,
        subtitle: p.subtitle,
        description: p.description,
        image_url: p.image_url,
        category: p.category,
        tech_stack: p.tech_stack,
        demo_url: p.demo_url,
        github_url: p.github_url,
        is_featured: p.is_featured || false,
        order_index: idx + 1,
      }));

      const { data, error } = await supabase
        .from("projects")
        .insert(projectsToInsert)
        .select();

      if (error) {
        alert(`Error inserting data to database: ${error.message}`);
      } else {
        alert(`Berhasil memasukkan ${data.length} data proyek ke Supabase Database!`);
        fetchProjects();
      }
    } catch (err) {
      alert(`Seed failed: ${err.message}`);
    } finally {
      setSeeding(false);
    }
  };

  const openForm = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || "",
        subtitle: project.subtitle || "",
        description: project.description || "",
        category: project.category || "web",
        tech_stack: Array.isArray(project.tech_stack)
          ? project.tech_stack.join(", ")
          : "",
        image_url: project.image_url || "",
        demo_url: project.demo_url || "",
        github_url: project.github_url || "",
        order_index: project.order_index || 0,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        category: "web",
        tech_stack: "React, Tailwind CSS, Next.js",
        image_url: "/portfolio/zentury.png",
        demo_url: "",
        github_url: "",
        order_index: projects.length + 1,
      });
    }
    setFormOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formattedTech = formData.tech_stack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      category: formData.category,
      tech_stack: formattedTech,
      image_url: formData.image_url,
      demo_url: formData.demo_url || null,
      github_url: formData.github_url || null,
      order_index: Number(formData.order_index),
    };

    if (isSupabaseConfigured && isDbConnected) {
      if (editingProject) {
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", editingProject.id);
        if (error) alert(error.message);
      } else {
        const { error } = await supabase.from("projects").insert([payload]);
        if (error) alert(error.message);
      }
      fetchProjects();
    } else {
      // Local state fallback update
      if (editingProject) {
        setProjects(
          projects.map((p) =>
            p.id === editingProject.id ? { ...p, ...payload } : p
          )
        );
      } else {
        setProjects([
          ...projects,
          { ...payload, id: String(Date.now()) },
        ]);
      }
    }
    setFormOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingProject) return;
    setIsDeleting(true);
    try {
      if (isSupabaseConfigured && isDbConnected) {
        const { error } = await supabase
          .from("projects")
          .delete()
          .eq("id", deletingProject.id);
        if (error) alert(error.message);
        fetchProjects();
      } else {
        setProjects(projects.filter((p) => p.id !== deletingProject.id));
      }
      setDeletingProject(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Drag and drop state & handlers
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    // Only reset if needed
  };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updatedProjects = [...projects];
    const [movedItem] = updatedProjects.splice(draggedIndex, 1);
    updatedProjects.splice(dropIndex, 0, movedItem);

    // Update order_index sequentially starting from 1
    const reordered = updatedProjects.map((item, idx) => ({
      ...item,
      order_index: idx + 1,
    }));

    setProjects(reordered);
    setDraggedIndex(null);
    setDragOverIndex(null);

    // Save order to Supabase
    if (isSupabaseConfigured && isDbConnected) {
      setIsSavingOrder(true);
      try {
        const updates = reordered.map((item) =>
          supabase
            .from("projects")
            .update({ order_index: item.order_index })
            .eq("id", item.id)
        );
        await Promise.all(updates);
      } catch (err) {
        console.error("Gagal menyimpan urutan:", err);
      } finally {
        setIsSavingOrder(false);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            Manage Projects
            {isSavingOrder && (
              <span className="text-xs font-normal text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full animate-pulse flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                Menyimpan urutan...
              </span>
            )}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Tarik & geser (drag & drop) kartu proyek untuk mengatur urutan tampilan. Proyek paling atas akan tampil pertama.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {projects.length === 0 && isDbConnected && (
            <button
              onClick={handleSeedDatabase}
              disabled={seeding}
              className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 rounded-xl text-xs font-semibold transition-all"
            >
              {seeding ? "Importing..." : "⚡ Sync & Populate Default Projects"}
            </button>
          )}
          <button onClick={() => openForm()} className="btn-primary py-2 px-5 text-xs">
            + Add New Project
          </button>
        </div>
      </div>

      {/* Database Connection Status Banner */}
      {dbError && (
        <div className="mb-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold">⚠️ Database Table Not Found / Empty:</span> {dbError}
            <p className="text-[11px] text-zinc-400 mt-1">
              Jalankan script <code className="text-white bg-black/40 px-1 py-0.5 rounded">supabase_schema.sql</code> di Supabase SQL Editor untuk mengaktifkan database secara penuh.
            </p>
          </div>
          <button
            onClick={fetchProjects}
            className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 rounded-lg text-amber-200 text-xs font-semibold whitespace-nowrap"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Table is empty state */}
      {!loading && projects.length === 0 && (
        <div className="glass-card p-12 text-center flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-400">
            📁
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Belum Ada Data Proyek di Database Supabase</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
              Tabel <code className="text-white">projects</code> di Supabase Anda saat ini kosong. Anda bisa klik tombol di bawah untuk memasukkan 16 data proyek default ke database secara instan.
            </p>
          </div>
          <button
            onClick={handleSeedDatabase}
            disabled={seeding}
            className="btn-primary py-2.5 px-6 text-xs mt-2"
          >
            {seeding ? "Mengimpor Data..." : "⚡ Masukkan 16 Proyek ke Supabase"}
          </button>
        </div>
      )}

      {/* Projects Table / List */}
      {projects.length > 0 && (
        <div className="glass-card overflow-hidden">
          <div className="divide-y divide-white/5">
            {projects.map((project, idx) => {
              const isDragging = draggedIndex === idx;
              const isOver = dragOverIndex === idx && draggedIndex !== idx;

              return (
                <div
                  key={project.id || idx}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragEnd={() => {
                    setDraggedIndex(null);
                    setDragOverIndex(null);
                  }}
                  className={`p-3.5 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 transition-all duration-150 select-none cursor-grab active:cursor-grabbing ${
                    isDragging
                      ? "opacity-40 bg-white/[0.08] scale-[0.99] border-dashed border-cyan-500/40"
                      : isOver
                      ? "bg-cyan-500/10 border-t-2 border-cyan-400"
                      : "hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-4 flex-1 min-w-0">
                    {/* Drag Handle & Order Badge */}
                    <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-500 flex-shrink-0">
                      <div className="p-1 rounded hover:bg-white/5 cursor-grab active:cursor-grabbing text-zinc-400 hover:text-white" title="Tarik untuk memindahkan">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8h16M4 16h16"
                          />
                        </svg>
                      </div>
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-white/5 border border-white/5 text-[10px] sm:text-[11px] font-semibold text-zinc-400 flex items-center justify-center">
                        #{idx + 1}
                      </span>
                    </div>

                    {/* Thumbnail */}
                    <div className="w-12 h-10 sm:w-16 sm:h-12 rounded-lg bg-zinc-800 border border-white/5 overflow-hidden flex-shrink-0">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </div>

                    {/* Project Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <h3 className="font-semibold text-white text-xs sm:text-sm truncate">
                          {project.title}
                        </h3>
                        <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 sm:px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-zinc-400 line-clamp-1 mt-0.5">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    className="flex items-center justify-end gap-2 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-white/5 flex-shrink-0"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openForm(project);
                      }}
                      className="flex-1 md:flex-initial px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 hover:border-white/20 border border-white/5 text-xs text-zinc-300 hover:text-white transition-all font-medium text-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingProject(project);
                      }}
                      className="flex-1 md:flex-initial px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-xs text-red-400 hover:text-red-300 transition-all font-medium text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Edit / Add Modal Form */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="fixed inset-0" 
            onClick={() => setFormOpen(false)} 
          />
          <div className="relative z-10 bg-[#121214]/95 border border-white/10 rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl shadow-black/80 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
              <div>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400">
                  {editingProject ? "Project Settings" : "New Creation"}
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center border border-white/5 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                  placeholder="e.g. Zentury"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                  placeholder="e.g. Front-End Web Development"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181b] border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                >
                  <option value="web">Web Development</option>
                  <option value="uiux">UI/UX Design</option>
                  <option value="mobile">Mobile App</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tech_stack}
                  onChange={(e) =>
                    setFormData({ ...formData, tech_stack: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                  placeholder="React, Tailwind CSS, GSAP"
                />
              </div>

              <ImageUpload
                label="Thumbnail / Screenshot Proyek"
                folder="projects"
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
              />

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Demo / Live URL
                </label>
                <input
                  type="url"
                  value={formData.demo_url}
                  onChange={(e) =>
                    setFormData({ ...formData, demo_url: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Description
                </label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 resize-none transition-all"
                  placeholder="Ceritakan gambaran singkat proyek ini..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-5 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary py-2.5 px-6 text-xs">
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Sleek Delete Confirmation Modal */}
      {deletingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => !isDeleting && setDeletingProject(null)}
          />
          <div className="relative z-10 bg-[#121214] border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl shadow-black/80">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              Delete Project?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Apakah Anda yakin ingin menghapus proyek <span className="text-white font-semibold">"{deletingProject.title}"</span>? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeletingProject(null)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
                className="px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold shadow-lg shadow-red-500/20 transition-all flex items-center gap-2"
              >
                {isDeleting ? "Deleting..." : "Delete Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
