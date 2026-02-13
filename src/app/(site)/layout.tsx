import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
import { reader } from "@/lib/keystatic";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await reader.singletons.siteSettings.read();

  return {
    title: siteSettings?.title || "Test Engineer | Travel Storyteller",
    description: siteSettings?.description || "Welcome to my professional portfolio. I build modern web applications.",
    icons: {
      icon: siteSettings?.favicon || "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await reader.singletons.profile.read();
  const footerSettings = (profile as any)?.sections?.footer;
  const themeColorData = (profile as any)?.appearance?.themeColor;
  const themeColor = themeColorData?.value || '#FDC435';
  const navigationSettings = (profile as any)?.sections?.navigation?.links || [];
  const footerLinks = navigationSettings.filter((link: any) => link.showInFooter);
  const menuBackgroundText = (profile as any)?.sections?.navigation?.menuBackgroundText || 'PRANTO';

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
          <Navbar themeColor={themeColor} navLinks={navigationSettings} menuBackgroundText={menuBackgroundText} />
          <main className="flex-grow">
            {children}
          </main>
          <Toaster />
          <Footer settings={footerSettings} themeColor={themeColor} footerLinks={footerLinks} />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
