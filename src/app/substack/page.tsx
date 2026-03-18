"use client";

import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import FadeIn from "../../components/FadeIn";
import TrackableButton from "../../components/TrackableButton";

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
}

function parseRSS(xml: string): SubstackPost[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  const items = doc.querySelectorAll("item");
  const posts: SubstackPost[] = [];

  items.forEach((item, i) => {
    if (i >= 6) return;
    const title = item.querySelector("title")?.textContent || "";
    const link = item.querySelector("link")?.textContent || "";
    const pubDate = item.querySelector("pubDate")?.textContent || "";
    const description = item.querySelector("description")?.textContent || "";

    // Strip HTML and truncate
    const tmp = document.createElement("div");
    tmp.innerHTML = description;
    const text = tmp.textContent || "";
    const excerpt = text.length > 200 ? text.slice(0, 200) + "..." : text;

    posts.push({ title, link, pubDate, excerpt });
  });

  return posts;
}

export default function SubstackPage() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/substack")
      .then((res) => res.text())
      .then((xml) => {
        setPosts(parseRSS(xml));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-white pb-20">
      <PageHeader title="Substack" />

      <div className="max-w-5xl mx-auto px-6">
        {loading ? (
          <div className="text-center py-20 text-neutral-400 font-sans">
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20">
              <p className="text-neutral-400 font-sans mb-6">
                No posts found. Visit the Substack directly:
              </p>
              <TrackableButton
                label="Visit Substack"
                href="https://substack.com/@fashionnotesx"
                external
              >
                Visit Substack &rarr;
              </TrackableButton>
            </div>
          </FadeIn>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post, i) => (
              <FadeIn key={post.link} delay={i * 0.1}>
                <article className="group bg-white border border-neutral-100 rounded-sm p-8 h-full flex flex-col transition-all hover:border-[#E8A0A0] hover:shadow-sm">
                  <time className="text-xs text-neutral-400 font-sans uppercase tracking-widest mb-3">
                    {new Date(post.pubDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="font-serif text-xl md:text-2xl font-semibold mb-4 tracking-tight">
                    {post.title}
                  </h2>
                  <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <TrackableButton
                    label={`Read: ${post.title}`}
                    href={post.link}
                    external
                    className="self-start text-xs"
                  >
                    Read &rarr;
                  </TrackableButton>
                </article>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
