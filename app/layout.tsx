/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Fira_Code, Sarabun } from "next/font/google";
import localFont from "next/font/local";
import React from "react";

import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Navbar/Sidebar";
import SearchModal from "@/components/Search/SearchModal";
import { SearchModalProvider } from "@/context/SearchModalContext";
import ThemeProvider from "@/context/Theme";

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "thai"],
});

const firaCode = Fira_Code({
  variable: "--font-firaCode",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ซีเอสๆ | หน้าแรก",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={`${sarabun.className} ${firaCode.variable} ${inter.variable} bg-light100_dark900 antialiased`}
      >
        <div className="jun-layout gap-y-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-20">
            {/* Light Mode Background */}
            <div className="absolute inset-0 w-full">
              <div className="relative mx-auto aspect-video w-full md:max-w-7xl lg:max-w-[120rem] xl:max-w-[150rem]">
                <img
                  src="/images/background/light-blur-blob-bg-mobile.png"
                  alt="Light mode background"
                  className="absolute inset-0 size-full object-cover opacity-20 dark:hidden"
                />
              </div>
            </div>

            {/* Dark Mode Background */}
            <div className="absolute inset-0 w-full">
              <div className="relative mx-auto aspect-video w-full md:max-w-7xl lg:max-w-[120rem] xl:max-w-[150rem]">
                <img
                  src="/images/background/dark-blur-blob-bg-mobile.png"
                  alt="Dark mode background"
                  className="absolute inset-0 hidden size-full object-cover opacity-20 dark:block"
                />
              </div>
            </div>
          </div>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SearchModalProvider>
              <Navbar />
              <SearchModal />
              {children}
              <Sidebar />
              <Footer />
            </SearchModalProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
