"use client";

import { reports } from "../../../config/reports";
import PageHeader from "../../components/PageHeader";
import FadeIn from "../../components/FadeIn";
import TrackableButton from "../../components/TrackableButton";

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-white pb-20">
      <PageHeader title="Insights" />

      <div className="max-w-5xl mx-auto px-6 space-y-6">
        {reports.map((report, i) => (
          <FadeIn key={report.id} delay={i * 0.1}>
            <article className="group bg-white border border-neutral-100 rounded-sm p-8 md:p-10 transition-all hover:border-[#E8A0A0] hover:shadow-sm flex items-center justify-between gap-6">
              <div className="flex-1">
                <h2 className="font-serif text-xl md:text-2xl font-semibold tracking-tight group-hover:text-[#E8A0A0] transition-colors">
                  {report.title}
                </h2>
              </div>
              <TrackableButton
                label={`View: ${report.title}`}
                href={report.link}
                external
              >
                Open &rarr;
              </TrackableButton>
            </article>
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
