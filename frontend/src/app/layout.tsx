import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/map.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { TranslationsProvider } from "@/contexts/TranslationsContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pluribus - International Delivery Made Simple",
  description: "Connect with sellers worldwide and get products delivered internationally. Simple, fast, and accessible.",
  keywords: ["international delivery", "global marketplace", "cross-border shopping"],
  openGraph: {
    title: "Pluribus - International Delivery Made Simple",
    description: "Connect with sellers worldwide and get products delivered internationally.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <AuthProvider>
            <TranslationsProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </TranslationsProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
