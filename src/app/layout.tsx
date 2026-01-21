import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"]},
)

export const metadata: Metadata = {
  title: "Veterinária São Bento - Início",
  description: "Agendamento e gestão para clínicas veterinárias, 42 anos de história e cuidado integral. Do diagnóstico à recuperação, tudo em um só lugar."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} antialiased min-h-screen w-full`}
      >
        {children}
      </body>
    </html>
  );
}
