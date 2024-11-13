import type { Metadata } from "next";
import "./globals.css";

import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
