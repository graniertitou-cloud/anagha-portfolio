"use client";

import { motion } from "framer-motion";
import { siteConfig } from "../../config/site";
import TrackableButton from "../components/TrackableButton";

export default function Home() {
  return (
    <main className="h-screen bg-white flex flex-col overflow-hidden">
      <header className="text-center pt-6 pb-3 md:pt-8 md:pb-4 px-4 flex-shrink-0">
        <motion.h1
          className="font-serif text-4xl sm:text-5xl md:text-7xl text-black mb-1 tracking-wide"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {siteConfig.name}
        </motion.h1>
        <motion.p
          className="font-serif text-xs sm:text-sm md:text-base text-neutral-400 tracking-[0.25em] uppercase mb-4 md:mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {siteConfig.subtitle}
        </motion.p>
        <motion.nav
          className="flex justify-center gap-2 md:gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {siteConfig.navButtons.map((btn) => (
            <TrackableButton key={btn.label} label={btn.label} href={btn.href} />
          ))}
        </motion.nav>
      </header>

      <section className="relative flex-1 mx-auto w-full max-w-5xl overflow-hidden flex items-center justify-center">
        <motion.div
          className="bg-black"
          style={{ aspectRatio: "9/16", height: "80%" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        />
      </section>
    </main>
  );
}
