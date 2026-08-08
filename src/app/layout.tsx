import type { Metadata } from "next";
import { Anton, Roboto_Flex } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/navigation";
import Preloader from "@/components/ui/Preloader";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTopButton from "@/components/ui/BackToTopButton";
import RollingBall from "@/components/ui/RollingBall";
import SmoothScroll from "@/components/providers/SmoothScroll";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  display: "swap",
});

const DESCRIPTION =
  "Electronics and Communications Engineer turned Software Engineer, with 5+ years shipping production web apps and AI powered features on AWS Bedrock.";

export const metadata: Metadata = {
  title: "Florante G. Clavano Jr. | Full Stack Engineer",
  description: DESCRIPTION,
  keywords: [
    "software engineer",
    "electronics and communications engineer",
    "full stack developer",
    "React",
    "Next.js",
    "TypeScript",
    "Philippines",
  ],
  authors: [{ name: "Florante G. Clavano Jr." }],
  creator: "Florante G. Clavano Jr.",
  openGraph: {
    type: "website",
    title: "Florante G. Clavano Jr. | Full Stack Engineer",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Florante G. Clavano Jr. | Full Stack Engineer",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${robotoFlex.variable}`}>
      <body className="bg-canvas text-body antialiased">
        {/* Reveal animations hide their targets in CSS; without JS they must
            still be readable. */}
        <noscript>
          <style>{`.slide-up-and-fade,.slide-up,.reveal-mask>*{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        {/* Hidden while trying the rolling ball as the single background
            ornament; restore by re-adding <ParticleField />. */}
        <RollingBall />
        <Preloader />
        <SmoothScroll />
        <Navigation />
        <ScrollProgress />
        <BackToTopButton />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
