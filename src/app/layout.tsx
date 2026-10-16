import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Intekhab Ansari | Full Stack Web Developer & WordPress Specialist in Mumbai",
  description:
    "Looking for a professional Web Developer? Intekhab Ansari specializes in custom React web apps, WordPress e-commerce websites, Java & Spring Boot solutions. Hire for freelance & contract projects. Get a free quote!",
  keywords: [
    "web developer",
    "hire web developer",
    "freelance web developer Mumbai",
    "React developer",
    "full stack developer",
    "WordPress developer",
    "custom website developer",
    "e-commerce developer",
    "Java developer",
    "Intekhab Ansari",
    "web development services",
  ],
  authors: [{ name: "Intekhab Ansari" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://intekhab-ansari.vercel.app/",
  },
  openGraph: {
    type: "website",
    siteName: "Intekhab Ansari Portfolio",
    title: "Hire Intekhab Ansari | Full Stack Web Developer & WordPress Expert",
    description:
      "Custom React web apps, e-commerce storefronts, and full-stack web development services. Available for freelance & contract work.",
    images: ["https://intekhab-ansari.vercel.app/portfolio-logo.svg"],
    url: "https://intekhab-ansari.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Intekhab Ansari | Full Stack Web Developer",
    description:
      "Custom React web apps, e-commerce storefronts, and full-stack web development services. Available for freelance & contract work.",
    images: ["https://intekhab-ansari.vercel.app/portfolio-logo.svg"],
  },
  verification: {
    google: "Ee5IsSO11l6QCdCDqL6EMK9I-W6iBbLeZ9JPjuGk0gA",
  },
  icons: {
    icon: "/portfolio-logo.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Intekhab Ansari - Web Development Services",
  image: "https://intekhab-ansari.vercel.app/portfolio-logo.svg",
  "@id": "https://intekhab-ansari.vercel.app/#service",
  url: "https://intekhab-ansari.vercel.app",
  telephone: "+919594292262",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Goregaon (West)",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400104",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.1663,
    longitude: 72.8426,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "21:00",
  },
  sameAs: [
    "https://github.com/Intekhab-Ansari",
    "https://www.linkedin.com/in/intekhab-ansari-5a6934281",
  ],
  knowsAbout: [
    "Web Development Services",
    "React.js",
    "WordPress Development",
    "Full Stack Development",
    "Java",
    "Spring Boot",
    "Tailwind CSS",
    "E-Commerce Websites",
    "SEO & Performance Optimization",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom React & Full Stack Web App Development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "WordPress E-Commerce & Business Website Design",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Speed & SEO Optimization",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=()"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
