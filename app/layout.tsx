import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    locale: site.locale,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  // After adding the site in Google Search Console, set this in the Pages build environment.
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1424" },
  ],
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  givenName: "Fahad",
  additionalName: "Ahmed",
  familyName: "Patwary",
  alternateName: site.alternateNames,
  url: site.url,
  image: `${site.url}/fahad.webp`,
  email: site.email,
  jobTitle: "Software Engineer & ML Researcher",
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  nationality: { "@type": "Country", name: "Bangladesh" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "United International University", sameAs: "https://www.uiu.ac.bd" },
  knowsAbout: [
    "Software engineering", "Software testing", "Full-stack development", "System design",
    "Machine learning", "Green AI", "Explainable AI", "Flutter", "Next.js",
  ],
  sameAs: [site.github, site.linkedin],
  mainEntityOfPage: `${site.url}/`,
};

const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: `${site.name} — Portfolio`,
  alternateName: ["Fahad Patwary", "fahadpatwary.com"],
  inLanguage: "en",
  author: { "@id": `${site.url}/#person` },
  publisher: { "@id": `${site.url}/#person` },
};

// Cloudflare Web Analytics: set NEXT_PUBLIC_CF_BEACON_TOKEN in the Pages build environment.
const beacon = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="me" href={site.github} />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement;d.classList.add("js");var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-surface focus:p-2">
          Skip to content
        </a>
        <Nav cv={site.cv} />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([personLd, siteLd]) }} />
        {beacon && (
          <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={JSON.stringify({ token: beacon })} />
        )}
      </body>
    </html>
  );
}
