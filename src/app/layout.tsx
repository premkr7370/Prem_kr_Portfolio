import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";

export const metadata: Metadata = {
  title: "Prem Kumar | Full Stack AI Developer",
  description:
    "Portfolio of Prem Kumar — Full Stack AI Developer building intelligent applications, scalable backend systems, and modern digital experiences. Based in Bangalore, India.",
  keywords: [
    "Prem Kumar",
    "Full Stack AI Developer",
    "AI Developer",
    "Full Stack Developer",
    "React.js",
    "Node.js",
    "Next.js",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
    "Three.js",
    "Portfolio",
    "Bangalore",
    "Web Developer",
  ],
  authors: [{ name: "Prem Kumar" }],
  creator: "Prem Kumar",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Prem Kumar | Full Stack AI Developer",
    description:
      "Full Stack AI Developer building intelligent applications, scalable backend systems, and modern digital experiences.",
    type: "website",
    locale: "en_IN",
    siteName: "Prem Kumar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prem Kumar | Full Stack AI Developer",
    description:
      "Full Stack AI Developer building intelligent applications and modern digital experiences.",
  },
  metadataBase: new URL("https://prem-kumar-protfolio.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
