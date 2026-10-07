"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { initialSkills } from "@/lib/mockData";
import ImageUpload from "@/components/ImageUpload";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(null);
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    icon_url: "",
    order_index: 0,
  });

  const fetchSkills = async () => {
    setLoading(true);
    setDbError(null);

    if (!isSupabaseConfigured) {
      setSkills(initialSkills);
      setIsDbConnected(false);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) {
        console.warn("Supabase skills error:", error);
        setDbError(error.message);
        setSkills(initialSkills);
        setIsDbConnected(false);
      } else {
        setIsDbConnected(true);
        if (data && data.length > 0) {
          setSkills(data);
        } else {
          setSkills([]);
        }
      }
    } catch (err) {
      console.error(err);
      setDbError(err.message || "Failed to connect to Supabase");
      setSkills(initialSkills);
      setIsDbConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSeedSkills = async () => {
    if (!isSupabaseConfigured) return;
    setSeeding(true);
    try {
      const skillsToInsert = initialSkills.map((s, idx) => ({
        name: s.name,
        icon_url: s.icon_url,
        order_index: idx + 1,
      }));

      const { data, error } = await supabase
        .from("skills")
        .insert(skillsToInsert)
        .select();

      if (error) {
        alert(`Error inserting skills: ${error.message}`);
      } else {
        alert(`Berhasil memasukkan ${data.length} skills ke database!`);
        fetchSkills();
      }
    } catch (err) {
      alert(`Seed failed: ${err.message}`);
    } finally {
      setSeeding(false);
    }
  };

  const openForm = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        name: skill.name || "",
        icon_url: skill.icon_url || "",
        order_index: skill.order_index || 0,
      });
    } else {
      setEditingSkill(null);
      setFormData({
        name: "",
        icon_url: "",
        order_index: skills.length + 1,
      });
    }
    setFormOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      icon_url: formData.icon_url || null,
      order_index: Number(formData.order_index),
    };

    if (isSupabaseConfigured && isDbConnected) {
      if (editingSkill) {
        const { error } = await supabase
          .from("skills")
          .update(payload)
          .eq("id", editingSkill.id);
        if (error) alert(error.message);
      } else {
        const { error } = await supabase.from("skills").insert([payload]);
        if (error) alert(error.message);
      }
      fetchSkills();
    } else {
      if (editingSkill) {
        setSkills(
          skills.map((s) => (s.id === editingSkill.id ? { ...s, ...payload } : s))
        );
      } else {
        setSkills([...skills, { ...payload, id: String(Date.now()) }]);
      }
    }
    setFormOpen(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    if (isSupabaseConfigured && isDbConnected) {
      const { error } = await supabase.from("skills").delete().eq("id", id);
      if (error) alert(error.message);
      fetchSkills();
    } else {
      setSkills(skills.filter((s) => s.id !== id));
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Skills</h1>
          <p className="text-xs text-zinc-400">
            Kelola keahlian & teknologi yang ditampilkan di Bento Grid pada website Anda.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {skills.length === 0 && isDbConnected && (
            <button
              onClick={handleSeedSkills}
              disabled={seeding}
              className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 rounded-xl text-xs font-semibold transition-all"
            >
              {seeding ? "Importing..." : "⚡ Sync 6 Default Skills"}
            </button>
          )}
          <button onClick={() => openForm()} className="btn-primary py-2 px-5 text-xs">
            + Add New Skill
          </button>
        </div>
      </div>

      {dbError && (
        <div className="mb-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs flex items-center justify-between">
          <span>⚠️ {dbError}</span>
          <button
            onClick={fetchSkills}
            className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 rounded-lg text-amber-200 text-xs font-semibold"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && skills.length === 0 && (
        <div className="glass-card p-12 text-center flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-400">
            ⚡
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Tabel Skills Kosong</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
              Klik tombol di bawah untuk memasukkan 6 data skill utama (Laravel, Next.js, React JS, Vue.js, Git, Figma) ke Supabase.
            </p>
          </div>
          <button
            onClick={handleSeedSkills}
            disabled={seeding}
            className="btn-primary py-2.5 px-6 text-xs mt-2"
          >
            {seeding ? "Mengimpor..." : "⚡ Masukkan 6 Skill ke Supabase"}
          </button>
        </div>
      )}

      {skills.length > 0 && (
        <div className="glass-card overflow-hidden">
          <div className="divide-y divide-white/5">
            {skills.map((skill, idx) => (
              <div
                key={skill.id || idx}
                className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-bold text-xs text-zinc-400">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Icon: {skill.icon_url || "Auto / SVG"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openForm(skill)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
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
          <div className="glass-card max-w-md w-full p-6 relative">
            <h2 className="text-lg font-bold text-white mb-4">
              {editingSkill ? "Edit Skill" : "Add New Skill"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Nama Skill / Teknologi
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                  placeholder="e.g. Next.js, Laravel, React JS"
                />
              </div>

              <ImageUpload
                label="Icon / Logo Skill"
                folder="skills"
                value={formData.icon_url}
                onChange={(url) => setFormData({ ...formData, icon_url: url })}
              />

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
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-zinc-400"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary py-2 px-5 text-xs">
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
