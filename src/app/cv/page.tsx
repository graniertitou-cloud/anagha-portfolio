"use client";

import { cvConfig } from "../../../config/cv";
import PageHeader from "../../components/PageHeader";
import FadeIn from "../../components/FadeIn";
import TrackableButton from "../../components/TrackableButton";

export default function CVPage() {
  return (
    <main className="min-h-screen bg-white pb-20">
      <PageHeader title={cvConfig.sectionTitle} />

      <div className="max-w-4xl mx-auto px-6">
        <FadeIn delay={0.1}>
          <p className="font-sans text-lg text-neutral-600 leading-relaxed mb-10 max-w-2xl">
            {cvConfig.bio}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="w-full bg-white rounded-sm overflow-hidden border border-neutral-100 mb-8 shadow-sm">
            <img
              src={cvConfig.cvImagePath}
              alt="Curriculum Vitae — Anagha Bhandare"
              className="w-full h-auto"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="text-center">
            <TrackableButton
              label="Download CV"
              href={cvConfig.pdfPath}
              external
            >
              Download CV
            </TrackableButton>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
