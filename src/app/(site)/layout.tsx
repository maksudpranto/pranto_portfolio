import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
import { reader } from "@/lib/keystatic";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Test Engineer | Travel Storyteller",
  description: "Welcome to my professional portfolio. I build modern web applications.",
};

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
        </ThemeProvider>
      </body>
    </html>
  );
}
