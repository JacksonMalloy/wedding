import type { Metadata } from "next";
import { Parisienne, Marcellus_SC } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const marcellusSC = Marcellus_SC({
  variable: "--font-marcellus-sc",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Delina & Jackson | Wedding",
  description: "We're getting married! Join us to celebrate our special day.",
  openGraph: {
    title: "Delina & Jackson | Wedding",
    description: "We're getting married! Join us to celebrate our special day.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${parisienne.variable} ${marcellusSC.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
