"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";

export default function PageHeader({ title }: { title: string }) {
  return (
    <FadeIn>
      <div className="pt-12 pb-8 px-6 max-w-5xl mx-auto">
        <Link
          href="/"
          className="text-sm font-sans text-neutral-400 hover:text-black transition-colors"
        >
          &larr; Back
        </Link>
        <h1 className="mt-6 text-5xl md:text-6xl font-serif font-semibold tracking-tight">
          {title}
        </h1>
      </div>
    </FadeIn>
  );
}
