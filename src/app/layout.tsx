import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navigation from "@/components/ui/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description:
    "A modern personal portfolio showcasing my skills, projects, and experience",
  keywords: ["portfolio", "developer", "web development", "software engineer"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    title: "Personal Portfolio",
    description:
      "A modern personal portfolio showcasing my skills, projects, and experience",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Portfolio",
    description:
      "A modern personal portfolio showcasing my skills, projects, and experience",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
