import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Go Goal",
  description: "Let's set a goal today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
    <head>
    
      <Script 
        src="https://kit.fontawesome.com/3d72938be8.js" 
        strategy="beforeInteractive" 
      />
    </head>
    <body className={inter.className}>
      {children}
    </body>
  </html>
  );
}
