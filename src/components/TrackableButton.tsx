"use client";

import { track } from "@vercel/analytics";
import { motion } from "framer-motion";
import Link from "next/link";

interface TrackableButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function TrackableButton({
  label,
  href,
  onClick,
  external,
  className = "",
  children,
}: TrackableButtonProps) {
  const handleClick = () => {
    track(label);
    onClick?.();
  };

  const baseClasses = `inline-block px-5 py-2 md:px-6 md:py-2.5 rounded-full bg-[#E8A0A0]/70 text-black/80 font-sans text-xs md:text-sm tracking-wider transition-all hover:bg-[#E8A0A0] hover:shadow-sm backdrop-blur-sm border border-[#E8A0A0]/20 ${className}`;

  if (href && external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={baseClasses}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {children || label}
      </motion.a>
    );
  }

  if (href) {
    return (
      <Link href={href} onClick={handleClick} className={baseClasses}>
        <motion.span
          className="inline-block"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {children || label}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      className={baseClasses}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children || label}
    </motion.button>
  );
}
