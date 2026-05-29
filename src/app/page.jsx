"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TextHighlighter } from "@/components/ui/text-highlighter";

// Dynamically import ThreeCanvas to bypass Server-Side Rendering (SSR) errors
const ThreeCanvas = dynamic(() => import("@/components/ThreeCanvas"), {
  ssr: false,
});

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Inline SVG Brand Logo Lockup
const BrandLogo = () => (
  <svg viewBox="0 0 556.6 62.6" className="brand-logo" style={{ height: "24px", width: "auto" }}>
    <circle cx="31.2" cy="31.2" r="31.2" fill="var(--accent-color)" />
    <path fill="#FFFFFF" d="M131.4,10.1l-8.7,9.1c-3.8-4.2-9.3-6.6-15-6.5c-4.9-0.1-9.6,1.8-13,5.3c-3.4,3.6-5.3,8.3-5.2,13.3c-0.1,4.9,1.7,9.7,5.2,13.3c3.4,3.5,8.1,5.4,13,5.3c5.7,0.1,11.2-2.3,15-6.5l8.7,9c-6,6.7-14.7,10.4-23.7,10.2c-9,0-16.7-2.9-22.9-8.9s-9.3-13.5-9.3-22.5s3-16.3,9.3-22.3s13.9-8.8,22.9-8.8C117.2,0.1,125,3.3,131.4,10.1z" />
    <path fill="#FFFFFF" d="M139.9,62.6V0.1h14v10.5c2.8-6.2,9.3-10,17.6-10c1.4,0,2.8,0.1,4.2,0.4v13.6c-1.9-0.4-3.9-0.6-5.9-0.6c-9.8,0-16,6.1-16,15.9v32.8H139.9z" />
    <path fill="#FFFFFF" d="M179.3,31.4c0-9.4,2.9-16.9,8.7-22.7s13.3-8.6,22.3-8.6c8.6,0,15.6,2.8,21,8.6s8.2,12.8,8.2,21.3c0,1.8-0.1,3.4-0.2,4.9h-46c0.5,9.4,7.4,15.5,17.9,15.5c2.9,0,5.9-0.6,8.6-1.7c5.2-2.3,11.3-1.3,15.4,2.6l0.5,0.5c-6.4,7-15.4,10.9-24.9,10.8c-9.3,0-16.9-3.1-22.7-8.6s-8.7-12.9-8.7-22.2V31.4z M225.2,25c0-3.5-1.7-6.8-4.5-9c-2.9-2.6-6.6-4-10.5-3.9c-4.1-0.1-8.1,1.3-11.4,3.8c-3,2.1-4.9,5.5-5.3,9.1H225.2z" />
    <path fill="#FFFFFF" d="M294.9,10.4V0.1H309v62.5h-14.1V52.4c-2,5.8-9.2,10.2-18.9,10.2c-8,0-15.7-3.3-21.1-9.2c-5.6-6-8.5-13.3-8.5-22.1s2.8-16.1,8.5-22c5.5-5.8,13.2-9.1,21.2-8.9C285.8,0.5,292.9,4.6,294.9,10.4z M290.7,44.3c3.5-3.4,5.4-8.1,5.3-13c0.1-4.9-1.8-9.6-5.3-12.9c-3.4-3.4-8-5.3-12.8-5.2c-4.7-0.1-9.3,1.8-12.6,5.2c-3.3,3.5-5.1,8.1-4.9,12.9c-0.2,4.8,1.6,9.5,4.9,12.9c3.3,3.4,7.8,5.3,12.6,5.2C282.7,49.6,287.3,47.7,290.7,44.3L290.7,44.3z" />
    <path fill="#FFFFFF" d="M321.2,62.6V0.1h14v10.5c2.8-6.2,9.3-10,17.6-10c1.4,0,2.8,0.1,4.2,0.4v13.6c-1.9-0.4-3.9-0.6-5.9-0.6c-9.8,0-16,6.1-16,15.9v32.8H321.2z" />
    <path fill="#FFFFFF" d="M360.6,31.4c0-9.4,2.9-16.9,8.7-22.7s13.3-8.6,22.3-8.6c8.6,0,15.6,2.8,21,8.6s8.3,12.8,8.3,21.3c0,1.8-0.1,3.4-0.2,4.9h-46.1c0.5,9.4,7.4,15.5,17.9,15.5c2.9,0,5.8-0.6,8.5-1.7c5.2-2.3,11.3-1.3,15.4,2.6l0.5,0.5c-6.4,7-15.4,10.9-24.9,10.8c-9.3,0-16.9-3.1-22.7-8.6s-8.7-12.9-8.7-22.2L360.6,31.4z M406.6,25c0-3.5-1.7-6.8-4.5-9c-2.9-2.6-6.6-4-10.5-3.9c-4.1-0.1-8.1,1.3-11.4,3.8c-3,2.2-4.9,5.5-5.2,9.1H406.6z" />
    <path fill="#FFFFFF" d="M430.3,62.6V0.1h14v10.1c2.8-5.8,9.5-9.6,18-9.6c14.1,0,22.4,9.1,22.4,23.7v38.3h-14.1V26.3c0-8.1-4.7-13.2-12.6-13.2s-13.8,5.6-13.8,13.7v35.7H430.3z" />
    <path fill="#FFFFFF" d="M542.5,10.4V0.1h14.1v62.5h-14.1V52.4c-2,5.8-9.2,10.2-18.9,10.2c-8,0-15.7-3.3-21.1-9.2c-5.6-6-8.5-13.3-8.5-22.1s2.8-16.1,8.5-22c5.5-5.8,13.2-9.1,21.1-8.9C533.3,0.5,540.5,4.6,542.5,10.4z M538.3,44.3c3.5-3.4,5.4-8.1,5.3-12.9c0.1-4.9-1.8-9.6-5.3-12.9c-3.4-3.4-8-5.3-12.8-5.2c-4.7-0.1-9.3,1.8-12.6,5.2c-3.3,3.5-5.1,8.1-4.9,12.9c-0.2,4.8,1.6,9.5,4.9,12.9c3.3,3.4,7.8,5.3,12.6,5.2C530.3,49.6,534.9,47.7,538.3,44.3L538.3,44.3z" />
  </svg>
);

// High-fidelity Mock Founder Profiles for Portfolio Brands
const brandFounders = {
  "Ai Gridd": {
    name: "Elena Rostova",
    role: "Founder & Chief Architect",
    tagline: "Decentralized AI Infrastructure",
    journey: "Started in a basement with two developers, Ai Gridd built an open-source decentralized computing protocol to harness idle GPU power for AI training. The team pivoted during Cohort VI from developer tools to enterprise-level decentralized AI infrastructure, signing three major labs in their first month.",
    goal: "To democratize high-performance computing power and eliminate the enterprise dependency on centralized cloud monopolies.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    stats: "Cohort VI // Infrastructure"
  },
  "Animax": {
    name: "Marcus Vance",
    role: "Co-Founder & CEO",
    tagline: "Generative Media & 3D Pipelines",
    journey: "Founded by ex-Pixar engineers, Animax aimed to speed up the manual animation rendering pipeline. During their incubation, they developed a real-time diffusion-based rendering model that compresses weeks of production work into a few seconds, securing an exclusive pilot with a major streaming studio.",
    goal: "To empower independent creators with cinematic-grade generative 3D rendering at their fingertips.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    stats: "Cohort VI // Gen Media"
  },
  "Brandium": {
    name: "Chloe de Silva",
    role: "Founder & Creative Director",
    tagline: "Semantic Brand Identity Systems",
    journey: "Brandium began as an agency automating visual design files. They recognized that enterprises struggle to maintain consistent brand guidelines across thousands of channels. They built a semantic design engine that learns a brand's DNA and automatically reviews, edits, and outputs tailored marketing assets.",
    goal: "To scale enterprise brand management with instant, context-aware artificial design agents.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    stats: "Cohort V // Branding AI"
  },
  "Garden Of Babylone": {
    name: "Samir Al-Jamil",
    role: "Founder & CEO",
    tagline: "Modular Autonomous Agriculture",
    journey: "Coming from three generations of farmers, Samir combined agricultural heritage with deep machine learning. Garden of Babylone designed self-optimizing modular vertical farming towers. They scaled their pilot to five urban cities, reducing water usage by 95% while doubling average crop yields.",
    goal: "To feed the next billion citizens through sustainable, high-density autonomous agriculture.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    stats: "Cohort VI // Smart Agri"
  },
  "Moushir": {
    name: "Nadir Halawi",
    role: "Co-Founder & CEO",
    tagline: "Predictive Trade Logistics",
    journey: "Moushir's founders spent years dealing with custom delays in international trade. They built a unified telemetry and documentation engine that uses predictive AI to preempt customs bottlenecks, cutting border processing times from average 5 days to under 4 hours.",
    goal: "To build the operating system for frictionless, real-time global trade logistics.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    stats: "Cohort IV // Logistics"
  },
  "Tamwyl": {
    name: "Layla Belfort",
    role: "Co-Founder & Managing Partner",
    tagline: "Decarbonized Trade Finance",
    journey: "Tamwyl saw that small-to-medium businesses in emerging markets were locked out of international trade financing. They built a ledger-backed decentralized risk scoring engine that connects SMEs to global liquidity, helping fund over $14M in local supply chains within 9 months.",
    goal: "To close the $2.5 trillion global trade finance gap for emerging market merchants.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    stats: "Cohort VI // Fintech"
  },
  "candidli": {
    name: "Toby Mercer",
    role: "Founder & CEO",
    tagline: "Cryptographic Credential Vetting",
    journey: "candidli was founded to eliminate resume inflation and credential fraud. The team built a cryptographic vetting platform that allows candidates to prove their employment history, skills, and background using zero-knowledge proofs, without revealing sensitive private data.",
    goal: "To establish the global trust layer for human capital and professional credentials.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    stats: "Cohort V // HR Tech"
  },
  "click and win": {
    name: "Jin-Woo Park",
    role: "Co-Founder & Product Lead",
    tagline: "High-Throughput Play Economics",
    journey: "Spun out of a leading mobile games studio, Click and Win designed a micro-payment ledger that handles millions of transactions per second. They transformed player engagement by introducing real-value ownership of digital game assets, growing their active user base to 450k players.",
    goal: "To build the transaction layer for the next generation of digital play.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
    stats: "Cohort VI // Web3 Play"
  },
  "confidrive": {
    name: "Sophia Martinez",
    role: "Founder & CEO",
    tagline: "Autonomous Vehicle Cryptosecurity",
    journey: "Determined to protect autonomous cars from spoofing attacks, Confidrive built a decentralized hardware-secured ledger. They successfully integrated their security SDK with two major autonomous vehicle fleets, protecting critical sensor and trajectory telemetry.",
    goal: "To secure the autonomous vehicle networks that will drive our cities.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    stats: "Cohort VI // Autonomous"
  },
  "content is king": {
    name: "Arthur Pendelton",
    role: "Founder & CEO",
    tagline: "Smart Copyright Licensing",
    journey: "The founders built Content Is King to solve the complex web of digital copyright licensing. They developed dynamic smart contracts that automatically distribute micro-royalties to musicians, writers, and visual artists when their work is sampled or shared.",
    goal: "To ensure digital creators are instantly and fairly compensated across the decentralized web.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    stats: "Cohort V // IP Licensing"
  },
  "depanini": {
    name: "Yassine Mansour",
    role: "Founder & CEO",
    tagline: "P2P On-Demand Technical Dispatch",
    journey: "Depanini launched to support local gig economy workers facing high platform fees. They developed a zero-take-rate peer-to-peer marketplace connecting clients with local plumbing, electrical, and maintenance technicians, helping workers earn 30% more per hour.",
    goal: "To return platform value back to the hands of local service professionals.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    stats: "Cohort VI // Gig Economy"
  },
  "piassa": {
    name: "Amara Okoye",
    role: "Co-Founder & CEO",
    tagline: "Offline Financial Gateways",
    journey: "Piassa built a lightweight mobile gateway to bring informal retail merchants in West Africa into the digital economy. Their application integrates SMS-based ledger technology with offline digital payments, processing over $2.1M in transactions across unbanked areas.",
    goal: "To accelerate financial inclusion for Africa's 100 million informal micro-merchants.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    stats: "Cohort VI // Payments"
  }
};

export default function Home() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Portfolio Brands Data (matching filenames in assets/brands)
  const brands = [
    { name: "Ai Gridd", file: "Ai Gridd logo.png" },
    { name: "Animax", file: "Animax logo.png" },
    { name: "Brandium", file: "Brandium logo.png" },
    { name: "Garden Of Babylone", file: "Garden Of Babylone logo.png" },
    { name: "Moushir", file: "Moushir logo.png" },
    { name: "Tamwyl", file: "Tamwyl logo.png" },
    { name: "candidli", file: "candidli logo.png" },
    { name: "click and win", file: "click and win logo.png" },
    { name: "confidrive", file: "confidrive.png" },
    { name: "content is king", file: "content is king logo.png" },
    { name: "depanini", file: "depanini.png" },
    { name: "piassa", file: "piassa logo.png" }
  ];

  useGSAP((context, contextSafe) => {
    // 1. Custom Interactive Cursor
    const cursor = document.querySelector(".custom-cursor");
    const follower = document.querySelector(".custom-cursor-follower");

    const heroRight = document.querySelector(".hero-right");

    const onMouseMove = contextSafe((e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.05, overwrite: "auto" });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15, overwrite: "auto" });
      if (heroRight) {
        const rect = heroRight.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        heroRight.style.setProperty("--mouse-x", `${x}%`);
        heroRight.style.setProperty("--mouse-y", `${y}%`);
      }
    });

    window.addEventListener("mousemove", onMouseMove);

    // Interactive Hover State trigger for cursor scaling
    const hoverables = document.querySelectorAll("a, button, .brand-timeline-card, .btn-premium, .nav-item, .next-opportunity-card");
    const onMouseEnter = contextSafe(() => {
      document.body.classList.add("cursor-hover");
    });
    const onMouseLeave = contextSafe(() => {
      document.body.classList.remove("cursor-hover");
    });

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    // 2. Horizontal Section Division Lines Revealer
    gsap.fromTo(".grid-line-h", 
      { scaleX: 0 }, 
      { 
        scaleX: 1, 
        duration: 1.6, 
        ease: "power3.inOut", 
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
        }
      }
    );

    // 3. Stagger reveal hero text
    gsap.from(".reveal-hero", {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.12,
    });

    // 4. Stagger reveal stats counters
    gsap.from(".stat-item", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      delay: 0.4
    });

    // 5. Scroll triggered reveals for section headers
    const sectionReveals = document.querySelectorAll(".section-reveal");
    sectionReveals.forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
        }
      });
    });

    // 6. ScrollTrigger to track active company index in the vertical timeline
    const timelineItems = gsap.utils.toArray(".timeline-item");
    timelineItems.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });

    // 7. Stagger reveal Accelerator Pillars
    gsap.from(".pillar-card", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".pillars-grid",
        start: "top 80%",
      }
    });

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, { scope: containerRef });

  return (
    <main ref={containerRef} style={{ position: "relative", width: "100%" }}>
      {/* Custom cursor elements */}
      <div className="custom-cursor"></div>
      <div className="custom-cursor-follower"></div>

      {/* Decorative Crosshairs on corners */}
      <div className="crosshair" style={{ top: "80px", left: "4rem" }}></div>
      <div className="crosshair" style={{ top: "80px", right: "4rem" }}></div>

      {/* Fixed Header */}
      <header className="header">
        <a href="#" className="logo-link">
          <BrandLogo />
        </a>
        <nav className="nav-links">
          <a href="#about" className="nav-item">Ecosystem</a>
          <a href="#portfolio" className="nav-item">Portfolio</a>
          <a href="#pillars" className="nav-item">Mentorship</a>
          <a href="#contact" className="nav-item">Inquire</a>
        </nav>
        <button className="btn-premium">Apply Now</button>
      </header>

      {/* Structural layout wrapper */}
      <div className="layout-wrapper">
        
        {/* Centered Hero Section (Without 3D model) */}
        <section id="about" className="hero-section-center">
          <div className="hero-content-center">
            <span className="mono-label reveal-hero">[ CREARENA BUSINESS ACCELERATOR ]</span>
            <h1 className="hero-title reveal-hero">
              <TextHighlighter type="underline" color="var(--accent-color)" delay={0.4}>Startups</TextHighlighter> Start <TextHighlighter type="highlight" color="#3b82f6" delay={0.8}>Here.</TextHighlighter>
            </h1>
            <p className="hero-description reveal-hero">
              An elite ecosystem where high-value collective intelligence meets top-tier mentorship, multidisciplinary coaching, and premium collaborative workspaces.
            </p>
            <div className="stats-container-center">
              <div className="stat-item-center">
                <div className="stat-number">40+</div>
                <div className="stat-label">Startups Backed</div>
              </div>
              <div className="stat-item-center">
                <div className="stat-number">5</div>
                <div className="stat-label">Sectors: Agritech, Insurtech, Fintech, Proptech, Logtech</div>
              </div>
              <div className="stat-item-center">
                <div className="stat-number">$50K+</div>
                <div className="stat-label">Pre-Seed Funding Entry Point</div>
              </div>
              <div className="stat-item-center">
                <div className="stat-number text-stat">Pre-Seed / Angel</div>
                <div className="stat-label">Deep Investor Networks</div>
              </div>
              <div className="stat-item-center">
                <div className="stat-number">4+</div>
                <div className="stat-label">Open Innovations</div>
              </div>
              <div className="stat-item-center">
                <div className="stat-number text-stat">Family Offices</div>
                <div className="stat-label">Exclusive Network Access</div>
              </div>
            </div>
          </div>
        </section>

        {/* Infinite Slogan Marquee */}
        <div style={{ position: "relative", width: "100%" }}>
          <div className="grid-line-h" style={{ top: "0" }}></div>
          <div className="marquee-container">
            <div className="marquee-content">
              <span className="marquee-text">Startups start here <span>•</span></span>
              <span className="marquee-text">Crearena Accelerator <span>•</span></span>
              <span className="marquee-text">Collective Intelligence <span>•</span></span>
              <span className="marquee-text">Elite Mentorship <span>•</span></span>
              <span className="marquee-text">Startups start here <span>•</span></span>
              <span className="marquee-text">Crearena Accelerator <span>•</span></span>
              <span className="marquee-text">Collective Intelligence <span>•</span></span>
              <span className="marquee-text">Elite Mentorship <span>•</span></span>
            </div>
          </div>
        </div>

        {/* Portfolio Showcase Section (Vertical Sticky Timeline with Scroll Reveal) */}
        <section id="portfolio" className="timeline-section">
          <div className="grid-line-h" style={{ top: "0" }}></div>
          
          <div className="timeline-grid">
            
            {/* Left Slot (Sticky Visuals) - Desktop Only */}
            <div className="timeline-left desktop-only">
              <div key={`visual-${activeIndex}`} className="timeline-visual-card animate-fade-in">
                <div className="timeline-card-inner">
                  {/* Front Face: Startup Logo */}
                  <div className="timeline-card-front">
                    <div style={{ position: "relative", width: "100%", height: "100%" }}>
                      <Image 
                        src={`/assets/brands/${brands[activeIndex]?.file}`} 
                        alt={`${brands[activeIndex]?.name} Logo`} 
                        fill
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    </div>
                  </div>
                  {/* Back Face: Founder Portrait */}
                  <div className="timeline-card-back">
                    <img 
                      src={brandFounders[brands[activeIndex]?.name]?.avatar} 
                      alt={brandFounders[brands[activeIndex]?.name]?.name}
                      className="timeline-portrait-img"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Center Column (Scrollable List of Companies) */}
            <div className="timeline-center">
              {/* Timeline track vertical line - Desktop Only */}
              <div className="timeline-track-line desktop-only"></div>
              {/* Sticky indicator circle dot - Desktop Only */}
              <div className="timeline-indicator-circle desktop-only">
                <div className="timeline-indicator-dot"></div>
              </div>

              <div className="timeline-list">
                {brands.map((brand, idx) => {
                  const isCurrent = activeIndex === idx;
                  const founder = brandFounders[brand.name];
                  return (
                    <div 
                      key={idx} 
                      className={`timeline-item ${isCurrent ? "active" : ""}`}
                      onClick={() => {
                        const elements = document.querySelectorAll(".timeline-item");
                        if (elements[idx]) {
                          elements[idx].scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }}
                    >
                      <span className="timeline-number">{(idx + 1).toString().padStart(2, "0")}</span>
                      <h3 className="timeline-name">{brand.name}</h3>
                      <span className="timeline-cohort">{founder?.stats || "Accelerated // Cohort VI"}</span>
                      
                      {/* Mobile Inline Content - Accordion expanding when active */}
                      <div className="mobile-only mobile-inline-content">
                        {/* 3D Flip Visual Card inside mobile list */}
                        <div className="timeline-visual-card" style={{ margin: "1.5rem 0" }}>
                          <div className="timeline-card-inner">
                            <div className="timeline-card-front">
                              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                <Image 
                                  src={`/assets/brands/${brand.file}`} 
                                  alt={`${brand.name} Logo`} 
                                  fill
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </div>
                            <div className="timeline-card-back">
                              <img 
                                src={founder?.avatar} 
                                alt={founder?.name}
                                className="timeline-portrait-img"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Text details inside mobile list */}
                        <div className="details-card-wrap">
                          <h4 className="details-founders-title">{founder?.name}</h4>
                          <span className="details-founders-role">{founder?.role}</span>
                          
                          <div className="details-journey-title" style={{ marginTop: "1.5rem" }}>The Journey</div>
                          <p className="details-journey-text">{founder?.journey}</p>
                          
                          <div className="details-goal-box">
                            <p className="details-goal-text">{founder?.goal}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Slot (Sticky Text Details) - Desktop Only */}
            <div className="timeline-right desktop-only">
              <div key={`details-${activeIndex}`} className="details-card-wrap animate-fade-in">
                <h4 className="details-founders-title">
                  {brandFounders[brands[activeIndex]?.name]?.name}
                </h4>
                <span className="details-founders-role">
                  {brandFounders[brands[activeIndex]?.name]?.role}
                </span>
                
                <div className="details-journey-title">The Journey</div>
                <p className="details-journey-text">
                  {brandFounders[brands[activeIndex]?.name]?.journey}
                </p>
                
                <div className="details-goal-box">
                  <p className="details-goal-text">
                    {brandFounders[brands[activeIndex]?.name]?.goal}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Accelerator Pillars */}
        <section id="pillars" className="section-padding" style={{ position: "relative", backgroundColor: "var(--bg-darker)" }}>
          <div className="grid-line-h" style={{ top: "0" }}></div>
          
          <div style={{ marginBottom: "5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }} className="section-reveal">
            <span className="mono-label">[ SYSTEM OPERATION ]</span>
            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)", marginTop: "1.2rem", textTransform: "uppercase" }}>
              Our Acceleration Pillars
            </h2>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <span className="pillar-num">01 // INTELLIGENCE</span>
              <div>
                <h3 className="pillar-title">Collective Mind</h3>
                <p className="pillar-desc">
                  Unifying cross-disciplinary technical research and business mastery into a coordinated network of elite advisors.
                </p>
              </div>
            </div>
            <div className="pillar-card">
              <span className="pillar-num">02 // COACHING</span>
              <div>
                <h3 className="pillar-title">Bespoke Support</h3>
                <p className="pillar-desc">
                  High-touch, customized incubation strategies directly from founders who have built multi-billion dollar giants.
                </p>
              </div>
            </div>
            <div className="pillar-card">
              <span className="pillar-num">03 // SPACE</span>
              <div>
                <h3 className="pillar-title">Physical Arenas</h3>
                <p className="pillar-desc">
                  Striking, state-of-the-art office ecosystems in primary cities designed for deep work, privacy, and capital matchmaking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Physical & Brand Collateral Mockup Showcase */}
        <section className="section-padding" style={{ position: "relative" }}>
          <div className="grid-line-h" style={{ top: "0" }}></div>
          
          <div style={{ marginBottom: "4rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }} className="section-reveal">
            <span className="mono-label">[ MATERIAL EVIDENCE ]</span>
            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)", marginTop: "1.2rem", textTransform: "uppercase" }}>
              Physical & Identity Collateral
            </h2>
          </div>

          <div className="mockups-grid">
            <div className="mockup-item section-reveal">
              <span className="mono-label">MOCKUP A // ARCHITECTURAL PRESENCE</span>
              <h3 style={{ fontSize: "1.6rem", marginTop: "0.5rem", textTransform: "uppercase" }}>Travertine Lobby Signage</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "0.5rem", fontWeight: "300", lineHeight: "1.5" }}>
                Crearena's branding translated to high-end hospitality materials at our London coworking club.
              </p>
              <div className="mockup-image-wrap">
                <Image 
                  src="/assets/lobby_signage.png" 
                  alt="Crearena Travertine Lobby Signage Mockup" 
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
            <div className="mockup-item section-reveal">
              <span className="mono-label">MOCKUP B // EXCLUSIVE MEMBERSHIP</span>
              <h3 style={{ fontSize: "1.6rem", marginTop: "0.5rem", textTransform: "uppercase" }}>Obsidian Metal Membership Card</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "0.5rem", fontWeight: "300", lineHeight: "1.5" }}>
                Laser-engraved matte metal credentials issued strictly to accepted founders and lead GPs.
              </p>
              <div className="mockup-image-wrap">
                <Image 
                  src="/assets/investor_card.png" 
                  alt="Crearena Obsidian Metal Membership Card Mockup" 
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer id="contact" className="footer" style={{ position: "relative" }}>
          <div className="grid-line-h" style={{ top: "0" }}></div>
          <div className="footer-top">
            <div>
              <BrandLogo />
              <p style={{ color: "var(--text-muted)", marginTop: "1.5rem", maxWidth: "400px", fontSize: "0.95rem", fontWeight: "300", lineHeight: "1.6" }}>
                Crearena is a registered elite business accelerator. Admissions are subject to board approval.
              </p>
            </div>
            <div>
              <button className="btn-premium">Inquire For Cohort VII</button>
            </div>
          </div>
          <div className="footer-bottom">
            <div>
              © {new Date().getFullYear()} CREARENA. ALL RIGHTS RESERVED.
            </div>
            <div className="footer-links">
              <a href="#about" className="nav-item">Ecosystem</a>
              <a href="#portfolio" className="nav-item">Portfolio</a>
              <a href="#contact" className="nav-item">Contact</a>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}
