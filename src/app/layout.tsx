import "./globals.css";

import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body className="min-h-[100vh] grid grid-rows-[auto,1fr,auto]">
        {children}
      </body>
    </html>
  );
}
