import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Portfolio | Software Developer",
  description: "Welcome to my professional portfolio. I build modern web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Toaster />
          <footer className="border-t py-12 bg-white text-slate-500 mt-auto border-black/5">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12 flex flex-col items-center justify-between gap-6 md:flex-row">
              <p className="text-sm font-medium">
                &copy; {new Date().getFullYear()} MH. Built with Next.js & Tailwind.
              </p>
              <div className="flex items-center gap-8">
                <a href="#" className="text-sm font-bold hover:text-[#FDC435] transition-colors text-black">Github</a>
                <a href="#" className="text-sm font-bold hover:text-[#FDC435] transition-colors text-black">LinkedIn</a>
                <a href="#" className="text-sm font-bold hover:text-[#FDC435] transition-colors text-black">Twitter</a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
