import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { CommandPaletteProvider } from "@/components/CommandPaletteProvider";
import { Header } from "@/components/Header";
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Algorithms Midterm Prep",
  description: "Concept mastery + pattern recognition for the MPCS Algorithms midterm.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
          <CommandPaletteProvider>
            <Header />
            <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 md:px-6">{children}</main>
          </CommandPaletteProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
