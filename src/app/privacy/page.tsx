import type { Metadata } from "next";
import { legal } from "@/content/site";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Prabhu Prem Mission handles the information you choose to share.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title={legal.privacy.title}
      updated={legal.privacy.updated}
      intro={legal.privacy.intro}
      sections={legal.privacy.sections}
    />
  );
}
