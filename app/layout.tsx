import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ModalProvider } from "@/components/providers/ModalContext";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/navigation/ScrollToTop";

export const viewport: Viewport = {
  themeColor: "#0F0624",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://manaverse.tech"),
  title: {
    default: "ManaVerse Technologies Pvt. Ltd. | Chamet Digital Entertainment",
    template: "%s | ManaVerse Technologies Pvt. Ltd.",
  },
  description:
    "ManaVerse Technologies Pvt. Ltd. (Chamet) provides digital entertainment, live streaming, interactive party rooms, and safe, reliable earning opportunities with 11 years of experience.",
  keywords: [
    "ManaVerse Technologies Pvt. Ltd.",
    "Chamet",
    "Live Streaming",
    "Audio Party Rooms",
    "Playrooms",
    "Digital Entertainment",
    "Host Earning Platform",
    "Women Financial Support",
    "Interactive Social App",
    "Bengaluru HSR Layout",
    "London UK",
  ],
  authors: [{ name: "ManaVerse Technologies Pvt. Ltd." }],
  creator: "ManaVerse Technologies Pvt. Ltd.",
  publisher: "ManaVerse Technologies Pvt. Ltd.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manaverse.tech",
    title: "ManaVerse Technologies Pvt. Ltd. | Chamet Digital Entertainment",
    description:
      "Play • Connect • Earn • Grow. 11 Years of Excellence in Digital Entertainment & Live Streaming.",
    siteName: "ManaVerse Technologies Pvt. Ltd.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ManaVerse Technologies Pvt. Ltd. | Chamet Digital Entertainment",
    description:
      "Play • Connect • Earn • Grow. Safe, secure, and reliable earning opportunities for creators and hosts.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0F0624] text-white selection:bg-[#FF29D6] selection:text-white antialiased flex flex-col min-h-screen font-sans">
        <ModalProvider>
          <ScrollToTop />
          <HeaderWrapper />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
