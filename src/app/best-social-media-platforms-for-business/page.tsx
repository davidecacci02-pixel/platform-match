import React, { Suspense } from "react";
import type { Metadata } from "next";
import { BlogTabsHub } from "@/components/blog/BlogTabsHub";

export const metadata: Metadata = {
  title: {
    absolute: "Best Social Media Platforms for Business | Platform Match",
  },
  description:
    "Comprehensive guide to choosing the right social media platform for your small business. By the Pace Digital Marketing Lab team at Pace University.",
  keywords: [
    "best social media platforms for business",
    "social media for small business",
    "choosing social media platform",
    "social media marketing strategy 2026",
    "platform match quiz",
    "small business marketing guide",
  ],
  alternates: {
    canonical: "https://platform-match.vercel.app/best-social-media-platforms-for-business",
  },
  openGraph: {
    title: "Best Social Media Platforms for Business | Platform Match",
    description:
      "Discover the best social media platforms for business in 2026. Use our free decision quiz to compare Instagram, TikTok, Facebook, LinkedIn, YouTube, and Pinterest based on your audience and capacity.",
    url: "https://platform-match.vercel.app/best-social-media-platforms-for-business",
    siteName: "Pace Digital Marketing Lab • Platform Match",
    images: [
      {
        url: "/images/best-platforms-matrix.png",
        width: 1200,
        height: 675,
        alt: "Comparison chart of the best social media platforms for business",
      },
    ],
    type: "article",
    publishedTime: "2026-01-15T08:00:00Z",
    modifiedTime: "2026-10-31T12:00:00Z",
    authors: ["By the Pace Digital Marketing Lab team"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Social Media Platforms for Business | Platform Match",
    description:
      "Discover the best social media platforms for business in 2026. Use our free decision quiz to compare Instagram, TikTok, Facebook, LinkedIn, YouTube, and Pinterest.",
    images: ["/images/best-platforms-matrix.png"],
  },
};

// JSON-LD Structured Data for On-Site SEO & AEO (Answer Engine Optimization)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://platform-match.vercel.app/best-social-media-platforms-for-business#article",
      "headline": "Find the Best Social Media Platform for Your Business",
      "name": "Best Social Media Platforms for Business: 2026 Selection Guide",
      "description":
        "Discover the best social media platforms for business in 2026. Use our free decision quiz to compare Instagram, TikTok, Facebook, LinkedIn, YouTube, and Pinterest based on your audience and capacity.",
      "image": "https://platform-match.vercel.app/images/best-platforms-matrix.png",
      "inLanguage": "en-US",
      "author": {
        "@type": "Person",
        "name": "Davide Cacciuottolo",
        "jobTitle": "Lead Marketing Researcher",
        "worksFor": {
          "@type": "EducationalOrganization",
          "name": "Pace University Lubin School of Business",
          "url": "https://www.pace.edu",
        },
      },
      "publisher": {
        "@type": "EducationalOrganization",
        "name": "Pace University Digital Marketing Lab",
        "url": "https://platform-match.vercel.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://platform-match.vercel.app/images/davide-cacciuottolo.jpg",
        },
      },
      "datePublished": "2026-01-15T08:00:00+00:00",
      "dateModified": "2026-10-31T12:00:00+00:00",
      "mainEntityOfPage": "https://platform-match.vercel.app/best-social-media-platforms-for-business",
    },
    {
      "@type": "FAQPage",
      "@id": "https://platform-match.vercel.app/best-social-media-platforms-for-business#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the best social media platform for my business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "There is no single best platform for every business. Your ideal choice depends on where your audience spends time, what goals you want to achieve, and what content your team can consistently produce within your available schedule.",
          },
        },
        {
          "@type": "Question",
          "name": "Is Platform Match free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Platform Match is a free interactive tool developed as a student project for MAR649 at Pace University. It compares Instagram, TikTok, Facebook, LinkedIn, YouTube, and Pinterest to help you establish clear channel priorities.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Platform Match calculate platform rankings?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Recommendations are calculated using a weighted six-factor model: Target Audience (30%), Marketing Goal (25%), Industry (15%), Content Strengths (15%), Brand Voice (10%), and Available Time (5%).",
          },
        },
        {
          "@type": "Question",
          "name": "Can I build a social media strategy with under 3 hours per week?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. The key is choosing one channel, focusing on one primary content format, and following a structured weekly routine that fits your exact capacity.",
          },
        },
        {
          "@type": "Question",
          "name": "Does a high compatibility score guarantee marketing results?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "No. Compatibility scores indicate theoretical fit based on our decision framework. Real-world results depend on content quality, offer appeal, audience response, and consistent execution.",
          },
        },
      ],
    },
  ],
};

export default function BestSocialMediaPlatformsArticlePage() {
  return (
    <>
      {/* JSON-LD for Search Engines & AEO AI crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="min-h-[60vh] bg-[#FAF9F6] flex items-center justify-center p-12 text-slate-500 font-bold">
            Loading Pace Marketing Lab Blog...
          </div>
        }
      >
        <BlogTabsHub />
      </Suspense>
    </>
  );
}
