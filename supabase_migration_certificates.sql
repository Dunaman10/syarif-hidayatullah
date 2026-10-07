-- ==============================================================================
-- MIGRATION: Restrukturisasi tabel Certificates (jalankan di Supabase SQL Editor)
-- ==============================================================================

-- 1. Drop tabel certificates lama (jika sudah ada dan ingin diganti)
DROP TABLE IF EXISTS certificates;

-- 2. Buat tabel certificate_categories (institusi penerbit)
CREATE TABLE IF NOT EXISTS certificate_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category_type TEXT NOT NULL DEFAULT 'Certification',
  description TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Buat tabel certificates (sertifikat individual per kategori)
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES certificate_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  level TEXT DEFAULT 'Beginner',
  pdf_url TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable RLS
ALTER TABLE certificate_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- 5. Public READ policy
CREATE POLICY "Allow public read certificate_categories" ON certificate_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read certificates" ON certificates FOR SELECT USING (true);

-- 6. Anon + Authenticated WRITE policy (untuk admin dashboard)
CREATE POLICY "Allow anon write certificate_categories" ON certificate_categories FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write certificates" ON certificates FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow auth write certificate_categories" ON certificate_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow auth write certificates" ON certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);
