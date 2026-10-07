"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import ImageUpload from "@/components/ImageUpload";

// Default data untuk seed
const defaultCategories = [
  { name: "Codepolitan", slug: "codepolitan", category_type: "WEB DEVELOPMENT", description: "Kurikulum Fullstack Web Developer", order_index: 1 },
  { name: "BNSP", slug: "bnsp", category_type: "National Certification", description: "Sertifikasi Kompetensi Nasional", order_index: 2 },
  { name: "Dicoding", slug: "dicoding", category_type: "Programming", description: "Learning path software & web", order_index: 3 },
  { name: "Alibaba Cloud", slug: "alibaba-cloud", category_type: "Cloud Technology", description: "Cloud & Generative AI", order_index: 4 },
  { name: "Google Developer Student Club", slug: "gdsc", category_type: "Community", description: "GDSC UIN Jakarta", order_index: 5 },
  { name: "Prakerja", slug: "prakerja", category_type: "Government Program", description: "Program Kartu Prakerja", order_index: 6 },
  { name: "Universitas Pamulang", slug: "unpam", category_type: "Education", description: "Tech Seminar Series UNPAM", order_index: 7 },
];

export default function AdminCertificatesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [isDbConnected, setIsDbConnected] = useState(false);

  // Category form
  const [catFormOpen, setCatFormOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [catForm, setCatForm] = useState({
    name: "", slug: "", category_type: "WEB DEVELOPMENT", description: "", order_index: 0,
  });

  // Cert form (adding individual cert under a category)
  const [certFormOpen, setCertFormOpen] = useState(false);
  const [certParentId, setCertParentId] = useState(null);
  const [certParentName, setCertParentName] = useState("");
  const [editingCert, setEditingCert] = useState(null);
  const [certForm, setCertForm] = useState({
    title: "", level: "Beginner", pdf_url: "", order_index: 0,
  });

  // Expanded categories (show certs inside)
  const [expandedCatId, setExpandedCatId] = useState(null);
  const [certsByCat, setCertsByCat] = useState({});
  const [certsLoading, setCertsLoading] = useState({});

  const fetchCategories = async () => {
    setLoading(true);
    if (!isSupabaseConfigured) {
      setCategories(defaultCategories.map((c, i) => ({ ...c, id: String(i + 1) })));
      setIsDbConnected(false);
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("certificate_categories")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) {
        console.warn("Fetch categories error:", error.message);
        setCategories([]);
        setIsDbConnected(false);
      } else {
        setIsDbConnected(true);
        setCategories(data || []);
      }
    } catch (err) {
      console.error(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCertsForCategory = async (categoryId) => {
    if (!isSupabaseConfigured) return;
    setCertsLoading((prev) => ({ ...prev, [categoryId]: true }));
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("category_id", categoryId)
        .order("order_index", { ascending: true });

      if (!error) {
        setCertsByCat((prev) => ({ ...prev, [categoryId]: data || [] }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCertsLoading((prev) => ({ ...prev, [categoryId]: false }));
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleToggleExpand = async (catId) => {
    if (expandedCatId === catId) {
      setExpandedCatId(null);
    } else {
      setExpandedCatId(catId);
      if (!certsByCat[catId]) {
        await fetchCertsForCategory(catId);
      }
    }
  };

  const handleSeedCategories = async () => {
    if (!isSupabaseConfigured) return;
    setSeeding(true);
    try {
      const { data, error } = await supabase
        .from("certificate_categories")
        .insert(defaultCategories)
        .select();
      if (error) alert(`Error: ${error.message}`);
      else { alert(`✅ Berhasil import ${data.length} kategori sertifikat!`); fetchCategories(); }
    } catch (err) { alert(err.message); }
    finally { setSeeding(false); }
  };

  // === Category CRUD ===
  const openCatForm = (cat = null) => {
    if (cat) {
      setEditingCat(cat);
      setCatForm({ name: cat.name, slug: cat.slug, category_type: cat.category_type, description: cat.description || "", order_index: cat.order_index });
    } else {
      setEditingCat(null);
      setCatForm({ name: "", slug: "", category_type: "WEB DEVELOPMENT", description: "", order_index: categories.length + 1 });
    }
    setCatFormOpen(true);
  };

  const handleSaveCat = async (e) => {
    e.preventDefault();
    const generatedSlug = catForm.slug.trim() || catForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const payload = { ...catForm, slug: generatedSlug, order_index: Number(catForm.order_index) };

    if (isSupabaseConfigured && isDbConnected) {
      if (editingCat) {
        const { error } = await supabase.from("certificate_categories").update(payload).eq("id", editingCat.id);
        if (error) { alert(error.message); return; }
      } else {
        const { error } = await supabase.from("certificate_categories").insert([payload]);
        if (error) { alert(error.message); return; }
      }
      fetchCategories();
    } else {
      if (editingCat) {
        setCategories(categories.map((c) => c.id === editingCat.id ? { ...c, ...payload } : c));
      } else {
        setCategories([...categories, { ...payload, id: String(Date.now()) }]);
      }
    }
    setCatFormOpen(false);
  };

  const handleDeleteCat = async (id) => {
    if (!confirm("Hapus kategori ini beserta semua sertifikatnya?")) return;
    if (isSupabaseConfigured && isDbConnected) {
      await supabase.from("certificate_categories").delete().eq("id", id);
      fetchCategories();
    } else {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  // === Certificate CRUD ===
  const openCertForm = (categoryId, categoryName, cert = null) => {
    setCertParentId(categoryId);
    setCertParentName(categoryName);
    if (cert) {
      setEditingCert(cert);
      setCertForm({ title: cert.title, level: cert.level || "Beginner", pdf_url: cert.pdf_url || "", order_index: cert.order_index || 0 });
    } else {
      setEditingCert(null);
      const existing = certsByCat[categoryId] || [];
      setCertForm({ title: "", level: "Beginner", pdf_url: "", order_index: existing.length + 1 });
    }
    setCertFormOpen(true);
  };

  const handleSaveCert = async (e) => {
    e.preventDefault();
    const payload = {
      category_id: certParentId,
      title: certForm.title,
      level: certForm.level,
      pdf_url: certForm.pdf_url || null,
      order_index: Number(certForm.order_index),
    };

    if (isSupabaseConfigured && isDbConnected) {
      if (editingCert) {
        const { error } = await supabase.from("certificates").update(payload).eq("id", editingCert.id);
        if (error) { alert(error.message); return; }
      } else {
        const { error } = await supabase.from("certificates").insert([payload]);
        if (error) { alert(error.message); return; }
      }
      await fetchCertsForCategory(certParentId);
    } else {
      const newCert = { ...payload, id: String(Date.now()) };
      setCertsByCat((prev) => ({
        ...prev,
        [certParentId]: editingCert
          ? (prev[certParentId] || []).map((c) => c.id === editingCert.id ? { ...c, ...payload } : c)
          : [...(prev[certParentId] || []), newCert],
      }));
    }
    setCertFormOpen(false);
  };

  const handleDeleteCert = async (certId, categoryId) => {
    if (!confirm("Hapus sertifikat ini?")) return;
    if (isSupabaseConfigured && isDbConnected) {
      await supabase.from("certificates").delete().eq("id", certId);
      await fetchCertsForCategory(categoryId);
    } else {
      setCertsByCat((prev) => ({ ...prev, [categoryId]: (prev[categoryId] || []).filter((c) => c.id !== certId) }));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Certificates</h1>
          <p className="text-xs text-zinc-400">
            Kelola kategori institusi dan sertifikat individual di dalamnya. Setiap kategori bisa punya banyak sertifikat PDF.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {categories.length === 0 && isDbConnected && (
            <button onClick={handleSeedCategories} disabled={seeding}
              className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 rounded-xl text-xs font-semibold transition-all">
              {seeding ? "Importing..." : "⚡ Sync 7 Default Kategori"}
            </button>
          )}
          <button onClick={() => openCatForm()} className="btn-primary py-2 px-5 text-xs">
            + Add Kategori
          </button>
        </div>
      </div>

      {/* Empty state */}
      {!loading && categories.length === 0 && (
        <div className="glass-card p-12 text-center flex flex-col items-center gap-4">
          <div className="text-3xl">🎓</div>
          <div>
            <h3 className="text-lg font-bold text-white">Belum Ada Kategori Sertifikat</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
              Klik tombol di bawah untuk import 7 kategori default (BNSP, Codepolitan, Dicoding, dll).
            </p>
          </div>
          <button onClick={handleSeedCategories} disabled={seeding} className="btn-primary py-2.5 px-6 text-xs mt-1">
            {seeding ? "Mengimpor..." : "⚡ Import 7 Kategori ke Supabase"}
          </button>
        </div>
      )}

      {/* Categories List */}
      {categories.length > 0 && (
        <div className="flex flex-col gap-3">
          {categories.map((cat) => {
            const isExpanded = expandedCatId === cat.id;
            const certs = certsByCat[cat.id] || [];
            const isLoading = certsLoading[cat.id];

            return (
              <div key={cat.id} className="glass-card overflow-hidden">
                {/* Category Header Row */}
                <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => handleToggleExpand(cat.id)}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${isExpanded ? "bg-[var(--color-accent)] text-black" : "bg-white/5 text-zinc-400"}`}>
                      {isExpanded ? "▼" : "▶"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-sm">{cat.name}</h3>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-accent)]/20">
                          {cat.category_type}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500">{cat.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button onClick={() => openCertForm(cat.id, cat.name)}
                      className="px-3 py-1.5 rounded-lg bg-[var(--color-accent-muted)] hover:bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-semibold transition-colors">
                      + Add Sertifikat
                    </button>
                    <button onClick={() => openCatForm(cat)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 transition-colors">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteCat(cat.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs text-red-400 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>

                {/* Expanded: Individual Certs */}
                {isExpanded && (
                  <div className="border-t border-white/5 bg-black/20">
                    {isLoading ? (
                      <p className="text-xs text-zinc-500 p-6">Memuat sertifikat...</p>
                    ) : certs.length === 0 ? (
                      <div className="p-6 text-center">
                        <p className="text-xs text-zinc-500 mb-3">Belum ada sertifikat di kategori ini.</p>
                        <button onClick={() => openCertForm(cat.id, cat.name)}
                          className="px-4 py-2 text-xs rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10">
                          + Tambah Sertifikat Pertama
                        </button>
                      </div>
                    ) : (
                      <div className="divide-y divide-white/5">
                        {certs.map((cert, idx) => (
                          <div key={cert.id} className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-4">
                              <span className="text-zinc-600 font-mono text-xs w-6">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <div>
                                <h4 className="text-sm font-medium text-white">{cert.title}</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[11px] text-zinc-500">{cert.level}</span>
                                  {cert.pdf_url && (
                                    <a href={cert.pdf_url} target="_blank"
                                      className="text-[11px] text-[var(--color-accent)] hover:underline">
                                      PDF ↗
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => openCertForm(cat.id, cat.name, cert)}
                                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 transition-colors">
                                Edit
                              </button>
                              <button onClick={() => handleDeleteCert(cert.id, cat.id)}
                                className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs text-red-400 transition-colors">
                                Del
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ========= Category Form Modal ========= */}
      {catFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6">
            <h2 className="text-lg font-bold text-white mb-4">
              {editingCat ? "Edit Kategori" : "Tambah Kategori Sertifikat"}
            </h2>
            <form onSubmit={handleSaveCat} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Nama Institusi *</label>
                <input type="text" required value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                  placeholder="e.g. Codepolitan, BNSP, Dicoding" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Jenis Kategori</label>
                <input type="text" value={catForm.category_type}
                  onChange={(e) => setCatForm({ ...catForm, category_type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                  placeholder="WEB DEVELOPMENT, Cloud Technology, National Certification" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Slug (URL identifier)</label>
                <input type="text" value={catForm.slug}
                  onChange={(e) => setCatForm({ ...catForm, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none font-mono"
                  placeholder="codepolitan (auto-generated jika kosong)" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Deskripsi</label>
                <input type="text" value={catForm.description}
                  onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                  placeholder="Deskripsi singkat kategori" />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setCatFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-zinc-400">
                  Cancel
                </button>
                <button type="submit" className="btn-primary py-2 px-5 text-xs">
                  Save Kategori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========= Certificate Form Modal ========= */}
      {certFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6">
            <h2 className="text-lg font-bold text-white mb-1">
              {editingCert ? "Edit Sertifikat" : "Tambah Sertifikat"}
            </h2>
            <p className="text-xs text-zinc-500 mb-4">Kategori: <span className="text-[var(--color-accent)]">{certParentName}</span></p>
            <form onSubmit={handleSaveCert} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Nama Sertifikat *</label>
                <input type="text" required value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                  placeholder="e.g. Belajar Vue JS 3" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Level</label>
                <select value={certForm.level}
                  onChange={(e) => setCertForm({ ...certForm, level: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#18181b] border border-white/10 text-white text-sm focus:outline-none">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Professional">Professional</option>
                  <option value="Fundamental">Fundamental</option>
                  <option value="Hands-on">Hands-on</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Member">Member</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Order Index</label>
                <input type="number" value={certForm.order_index}
                  onChange={(e) => setCertForm({ ...certForm, order_index: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none" />
              </div>
              {/* PDF Upload */}
              <ImageUpload
                label="File PDF / Gambar Sertifikat"
                folder="certificates"
                value={certForm.pdf_url}
                onChange={(url) => setCertForm({ ...certForm, pdf_url: url })}
              />
              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setCertFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-zinc-400">
                  Cancel
                </button>
                <button type="submit" className="btn-primary py-2 px-5 text-xs">
                  Save Sertifikat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
