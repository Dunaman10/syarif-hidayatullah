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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    if (isSupabaseConfigured && isDbConnected) {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) alert(error.message);
      fetchProjects();
    } else {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Projects</h1>
          <p className="text-xs text-zinc-400">
            Add, update, or remove portfolio case studies shown on your website.
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
            {projects.map((project, idx) => (
              <div
                key={project.id || idx}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded-lg bg-zinc-800 border border-white/5 overflow-hidden flex-shrink-0">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white text-sm">
                        {project.title}
                      </h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => openForm(project)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Form */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-4">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30"
                  placeholder="e.g. Zentury"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30"
                  placeholder="e.g. Front-End Web Development"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#18181b] border border-white/10 text-white text-sm focus:outline-none focus:border-white/30"
                  >
                    <option value="web">Web Development</option>
                    <option value="uiux">UI/UX Design</option>
                    <option value="mobile">Mobile App</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Order Index
                  </label>
                  <input
                    type="number"
                    value={formData.order_index}
                    onChange={(e) =>
                      setFormData({ ...formData, order_index: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tech_stack}
                  onChange={(e) =>
                    setFormData({ ...formData, tech_stack: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30"
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
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Demo / Live URL
                </label>
                <input
                  type="url"
                  value={formData.demo_url}
                  onChange={(e) =>
                    setFormData({ ...formData, demo_url: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary py-2 px-5 text-xs">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
