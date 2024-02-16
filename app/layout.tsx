import {GeistSans} from "geist/font/sans";
import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ollama Chat",
  description: "Local AI-powered Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <main className="h-[calc(100vh-57px)]">{children}</main>
      </body>
    </html>
  );
}
