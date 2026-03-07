import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/src/components/ui/Toaster"

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
  /* we must set the website baseUrl here so crawlers can get the images for metadata URLs correctly */
  metadataBase: new URL("https://veterinariasaobento.com.br"), 
  
  /* basic title and description metadata */
  title: "Centro Veterinário São Bento | Atendimento 24h",
  description: "Clínica veterinária 24h em Angra dos Reis. Consultas, exames, internação e muito amor para o seu pet, 42 anos de história e cuidado integral. Do diagnóstico à recuperação, tudo em um só lugar.",
  
  /* here we add metadata for cards that will show up when the website link is paste */
  openGraph: { /* openGraph is the default media metadata provider for almost all social medias (whatsapp, facebook, discord, etc) */
    title: "Centro Veterinário São Bento | Atendimento 24h",
    description: "Consultas, exames, internação e muito amor para o seu pet, 42 anos de história e cuidado integral. Do diagnóstico à recuperação, tudo em um só lugar.",
    url: "https://veterinariasaobento.com.br",
    siteName: "Vet São Bento",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", /* usually a good size is 1200x630 for an image in your public folder, assume the edges might 
        be cut sometimes and the image get squared */
        width: 1200,
        height: 630,
        alt: "Fachada do Centro Veterinário São Bento",
      },
    ],
  },
  
  // 3. Add Twitter specific metadata
  twitter: {
    card: "summary_large_image",
    title: "Centro Veterinário São Bento",
    description: "Consultas, exames, internação e muito amor para o seu pet, 42 anos de história e cuidado integral. Do diagnóstico à recuperação, tudo em um só lugar.",
    images: ["/og-image.jpg"], // Reuses the same image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${notoSans.className} antialiased min-h-screen w-full`}
      >
        {children}
        <Toaster position="top-center"/>
      </body>
    </html>
  );
}
