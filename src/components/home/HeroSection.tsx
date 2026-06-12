"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.6;
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background — replace src with your video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hero-poster.jpg"
      >
        <source src="/vedios/nature.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-green-950/70 via-green-900/60 to-green-950/80" />

      {/* Organic shape bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm mb-6">
          ✦ Community-powered sustainability
        </span>

        <h1 className="text-5xl md:text-6xl font-semibold text-white leading-tight mb-6">
          Spark ideas that{" "}
          <span className="text-green-300">heal the planet</span>
        </h1>

        <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Share, vote, and fund sustainability projects with your community.
          From solar rooftops to zero-waste kitchens.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/idea"
            className="px-6 py-3 bg-white text-green-900 rounded-full font-medium hover:bg-green-50 transition-colors"
          >
            Explore Ideas
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-transparent border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors"
          >
            Share Your Idea →
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 mt-12">
          {[
            { num: "2,400+", label: "Ideas shared" },
            { num: "840", label: "Members" },
            { num: "12", label: "Categories" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-semibold text-green-300">{s.num}</div>
              <div className="text-sm text-white/60 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}