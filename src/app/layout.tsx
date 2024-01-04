import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "margifnfi borrow availability",
  description: "See marginfi borrow availability for major assets",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <nav className="flex w-full flex-row items-center justify-center divide-x bg-zinc-900 px-3 py-2 text-zinc-200">
          <Link href="/" className="text-sm px-2">
            Borrow Caps
          </Link>

          <Link href="/health" className="text-sm px-2">
            Health Check
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
