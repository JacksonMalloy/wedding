import type { Metadata } from "next";
import { Beau_Rivage, Quattrocento } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";

const beauRivage = Beau_Rivage({
  variable: "--font-beau-rivage",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const quattrocento = Quattrocento({
  variable: "--font-quattrocento",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      <body className={`${beauRivage.variable} ${quattrocento.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
