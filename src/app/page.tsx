import type { Metadata } from "next";
import { HomeHero } from "@/components/home/home-hero";
import { Marquee } from "@/components/marquee";
import { MissionSection } from "@/components/home/mission-section";
import { GuidanceSection } from "@/components/home/guidance-section";
import { DarshanFeature } from "@/components/home/darshan-feature";
import { ShlokaSection } from "@/components/home/shloka-section";
import { PathSection } from "@/components/home/path-section";
import { InitiativesSection } from "@/components/home/initiatives-section";
import { VideoSection } from "@/components/home/video-section";
import { GyanSection } from "@/components/home/gyan-section";
import { DonationSection } from "@/components/home/donation-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { getDarshanEntries } from "@/lib/darshan";
import { getShlokaOfDay } from "@/lib/shloka";

export const metadata: Metadata = {
  title: {
    absolute: "Prabhu Prem Mission — Love, Wisdom & Seva",
  },
  description:
    "Discover the path of love, wisdom and spiritual awakening with Prabhu Prem Mission — a sanctuary of bhakti, seva and timeless Indian wisdom.",
};

export const revalidate = 3600;

export default function HomePage() {
  const entries = getDarshanEntries(7);
  const today = new Date();
  const shloka = getShlokaOfDay(today);
  const dateLabel = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
  }).format(today);

  return (
    <>
      <HomeHero />
      <Marquee />
      <MissionSection />
      <GuidanceSection />
      <ShlokaSection shloka={shloka} dateLabel={dateLabel} />
      <PathSection />
      <DarshanFeature entries={entries} />
      <InitiativesSection />
      <VideoSection />
      <GyanSection />
      <DonationSection />
      <NewsletterSection />
    </>
  );
}
