import type { Metadata, Viewport } from "next";
import { Manrope, Michroma, Syne } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { PwaRegistrar } from "@/components/PwaRegistrar";
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme-runtime.mjs";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700"],
});

const michroma = Michroma({
  subsets: ["latin"],
  variable: "--font-michroma",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://trickee-evify-live.vercel.app"),
  title: {
    default: "Trickee | Your Car Already Knows the Way",
    template: "%s | Trickee",
  },
  description: "Trickee turns raw GPS movement into protected range, safer routing, and decisions your EV fleet can trust.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Trickee",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#03070b" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning className={`${manrope.variable} ${syne.variable} ${michroma.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <PwaRegistrar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
