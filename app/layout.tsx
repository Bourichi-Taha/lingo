import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";
import ExitModal from "@/components/modals/exit-modal";
import HeartsModal from "@/components/modals/hearts-modal";
import PracticeModal from "@/components/modals/practice-modal";
const nuNunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lingo | Dashboard",
  description: "Learn and have fun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nuNunito.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
