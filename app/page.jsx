"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Certificate from "@/components/Certificate";
import Footer from "@/components/Footer";

import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialCertificates,
} from "@/lib/mockData";

export default function Page() {
  const [profile, setProfile] = useState(initialProfile);
  const [projects, setProjects] = useState(initialProjects);
  const [skills, setSkills] = useState(initialSkills);
  const [certificates, setCertificates] = useState(initialCertificates);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        // Fetch Profile / Settings
        const { data: profileData } = await supabase
          .from("site_settings")
          .select("*")
          .single();
        if (profileData) setProfile(profileData);

        // Fetch Projects
        const { data: projectsData } = await supabase
          .from("projects")
          .select("*")
          .order("order_index", { ascending: true });
        if (projectsData && projectsData.length > 0) setProjects(projectsData);

        // Fetch Skills
        const { data: skillsData } = await supabase
          .from("skills")
          .select("*")
          .order("order_index", { ascending: true });
        if (skillsData && skillsData.length > 0) setSkills(skillsData);

        // Fetch Certificates
        const { data: certsData } = await supabase
          .from("certificates")
          .select("*")
          .order("order_index", { ascending: true });
        if (certsData && certsData.length > 0) setCertificates(certsData);
      } catch (err) {
        console.warn("Supabase fetch error, fallback to initial dataset:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="relative min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar profile={profile} />
      <Home profile={profile} />
      <Skills skills={skills} />
      <Portfolio projects={projects} />
      <Certificate certificates={certificates} />
      <Footer profile={profile} />
    </main>
  );
}
