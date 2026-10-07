-- ==============================================================================
-- SUPABASE DATABASE SCHEMA FOR SYARIF HIDAYATULLAH PORTFOLIO
-- ==============================================================================

-- 1. PROFILES / SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL DEFAULT 'Syarif Hidayatullah',
  role_title TEXT NOT NULL DEFAULT 'Full-Stack Developer & UI/UX Designer',
  bio TEXT NOT NULL DEFAULT 'I am a passionate Full-Stack Developer specializing in building high-performance web applications with modern design aesthetics, rich micro-interactions, and seamless user experiences.',
  email TEXT NOT NULL DEFAULT 'syarif@example.com',
  github_url TEXT DEFAULT 'https://github.com/Dunaman10',
  linkedin_url TEXT DEFAULT 'https://linkedin.com/in/syarif-hidayatullah',
  fiverr_url TEXT DEFAULT 'https://www.fiverr.com',
  cv_url TEXT DEFAULT '/cv.pdf',
  avatar_url TEXT DEFAULT '/profil.png',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. SKILLS TABLE
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon_url TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  subtitle TEXT,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('web', 'uiux', 'mobile', 'fullstack')),
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  demo_url TEXT,
  github_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CERTIFICATE CATEGORIES TABLE
-- Mewakili institusi / penerbit sertifikat (Codepolitan, BNSP, Dicoding, dll)
CREATE TABLE IF NOT EXISTS certificate_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,          -- "Codepolitan"
  slug TEXT UNIQUE NOT NULL,   -- "codepolitan"
  category_type TEXT NOT NULL DEFAULT 'Certification', -- "WEB DEVELOPMENT", "Cloud Technology"
  description TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. CERTIFICATES TABLE
-- Mewakili sertifikat individual di dalam setiap kategori
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES certificate_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,         -- "Belajar Vue JS 3"
  level TEXT DEFAULT 'Beginner', -- "Advanced", "Intermediate", "Beginner"
  pdf_url TEXT,                -- URL PDF dari Supabase Storage
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificate_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Public READ policy
CREATE POLICY "Allow public read-only access on site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access on skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access on certificate_categories" ON certificate_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access on certificates" ON certificates FOR SELECT USING (true);

-- Anon WRITE policy (admin login via demo session)
CREATE POLICY "Allow anon write on skills" ON skills FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write on projects" ON projects FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write on certificate_categories" ON certificate_categories FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write on certificates" ON certificates FOR ALL TO anon USING (true) WITH CHECK (true);

-- Authenticated WRITE policy
CREATE POLICY "Allow admin full access on site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin full access on skills" ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin full access on projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin full access on certificate_categories" ON certificate_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin full access on certificates" ON certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKET SETUP
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Portfolio Assets" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Public Insert Portfolio Assets"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'portfolio-assets');

CREATE POLICY "Auth Update Portfolio Assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-assets')
WITH CHECK (bucket_id = 'portfolio-assets');

CREATE POLICY "Auth Delete Portfolio Assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-assets');
