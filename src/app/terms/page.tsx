import type { Metadata } from "next";
import { legal } from "@/content/site";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that govern the use of the Prabhu Prem Mission website.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title={legal.terms.title}
      updated={legal.terms.updated}
      intro={legal.terms.intro}
      sections={legal.terms.sections}
    />
  );
}
