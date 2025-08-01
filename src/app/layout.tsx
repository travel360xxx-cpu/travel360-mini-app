import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "360° Travel - Your Gateway to Global Adventures",
  description: "Discover hotels, flights, cars and more worldwide. Plan your trip now — quickly and easily with our modern travel platform.",
  keywords: "travel, hotels, flights, car rental, booking, vacation, trip planning",
  authors: [{ name: "360° Travel Team" }],
  openGraph: {
    title: "360° Travel - Your Gateway to Global Adventures",
    description: "Discover hotels, flights, cars and more worldwide. Plan your trip now — quickly and easily.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "360° Travel - Your Gateway to Global Adventures",
    description: "Discover hotels, flights, cars and more worldwide. Plan your trip now — quickly and easily.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
