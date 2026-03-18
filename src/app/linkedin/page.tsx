"use client";

import { linkedinConfig } from "../../../config/linkedin";
import PageHeader from "../../components/PageHeader";
import FadeIn from "../../components/FadeIn";
import TrackableButton from "../../components/TrackableButton";

export default function LinkedInPage() {
  return (
    <main className="min-h-screen bg-white pb-20">
      <PageHeader title="LinkedIn" />

      <div className="max-w-2xl mx-auto px-6">
        <FadeIn delay={0.1}>
          {/* Subtle grid background */}
          <div className="relative bg-white border border-neutral-100 rounded-sm p-10 md:p-14">
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative text-center">
              {/* Profile photo */}
              <div className="w-24 h-24 rounded-full bg-[#E8A0A0]/20 mx-auto mb-6 overflow-hidden">
                <img
                  src="/profile.png"
                  alt={linkedinConfig.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-2 tracking-tight">
                {linkedinConfig.name}
              </h2>
              <p className="font-sans text-sm text-neutral-400 uppercase tracking-[0.2em] mb-8">
                {linkedinConfig.title}
              </p>
              <p className="font-sans text-neutral-600 leading-relaxed mb-10 max-w-lg mx-auto">
                {linkedinConfig.bio}
              </p>

              <TrackableButton
                label="View LinkedIn Profile"
                href={linkedinConfig.url}
                external
              >
                View LinkedIn Profile &rarr;
              </TrackableButton>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
