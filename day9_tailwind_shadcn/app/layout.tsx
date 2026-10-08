import type { Metadata } from "next"
import { Toaster } from "sonner"
import { Providers } from "@/components/providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "NirmanIQ",
  description: "Construction intelligence platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  )
}