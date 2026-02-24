import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig, siteUrl } from "@/config/site";
import { industryCopy } from "@/config/industry";
import CookieConsent from "@/components/CookieConsent";
import MockupModeBanner from '@/components/MockupModeBanner';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.brandName} - ${industryCopy.seo.titleSuffix}`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description:
    `${siteConfig.brandName} ${industryCopy.seo.description}`,
  keywords: industryCopy.seo.keywords,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${siteConfig.brandName} - ${industryCopy.seo.titleSuffix}`,
    description:
      `${siteConfig.brandName} ${industryCopy.seo.description}`,
    url: '/',
    siteName: siteConfig.brandName,
    locale: siteConfig.defaultLocale,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const templateProfile = process.env.TEMPLATE_PROFILE?.trim() || 'default'
  const appMode = (process.env.APP_MODE?.trim().toLowerCase() === 'production' ? 'production' : 'mockup') as 'mockup' | 'production'

  return (
    <html lang="sv" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased font-sans`} suppressHydrationWarning>
        <Script id="template-runtime-config" strategy="beforeInteractive">
          {`window.__TEMPLATE_PROFILE__=${JSON.stringify(templateProfile)};window.__APP_MODE__=${JSON.stringify(appMode)};`}
        </Script>
        {children}
        <CookieConsent />
        <MockupModeBanner />
      </body>
    </html>
  );
}
