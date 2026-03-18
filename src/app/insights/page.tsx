"use client";

import { reports } from "../../../config/reports";
import PageHeader from "../../components/PageHeader";
import FadeIn from "../../components/FadeIn";
import TrackableButton from "../../components/TrackableButton";

function getPreviewUrl(link: string): string | null {
  const match = link.match(/\/file\/d\/([^/]+)/);
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  return null;
}

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-white pb-20">
      <PageHeader title="Insights" />

      <div className="max-w-5xl mx-auto px-6 space-y-10">
        {reports.map((report, i) => {
          const previewUrl = getPreviewUrl(report.link);
          return (
            <FadeIn key={report.id} delay={i * 0.15}>
              <article className="group bg-white border border-neutral-100 rounded-sm p-8 md:p-10 transition-all hover:border-[#E8A0A0] hover:shadow-sm">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-6 tracking-tight">
                  {report.title}
                </h2>

                {previewUrl && (
                  <div className="aspect-video w-full bg-neutral-50 rounded-sm overflow-hidden mb-6">
                    <iframe
                      src={previewUrl}
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                      title={report.title}
                    />
                  </div>
                )}

                <TrackableButton
                  label={`View: ${report.title}`}
                  href={report.link}
                  external
                >
                  Open Report &rarr;
                </TrackableButton>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </main>
  );
}
