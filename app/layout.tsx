import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils"
import "./globals.css";
import { ReactQueryProvider } from "./react-query-provider";
import { UserProvider } from "@/components/UserContext";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Faitch",
  description: "Faitch is a livestreaming platform that allows you to watch and share live video streams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          <ReactQueryProvider>
            <UserProvider>
              <Toaster theme="light" position="bottom-center" />
              {children}
              <Analytics />
            </UserProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
