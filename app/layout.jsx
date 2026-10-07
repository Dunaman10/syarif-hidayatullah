import "./globals.css";

export const metadata = {
  title: "Syarif Hidayatullah | Web Developer & UI/UX Designer",
  description: "Portfolio of Syarif Hidayatullah - Showcasing high-impact digital experiences, web development projects, skills, and certifications.",
  icons: {
    icon: "/profil.png",
    shortcut: "/profil.png",
    apple: "/profil.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}
