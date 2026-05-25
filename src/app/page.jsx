"use client";

import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

export default function Home() {
  const containerRef = useRef(null);

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

    const onMouseMove = contextSafe((e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.05, overwrite: "auto" });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15, overwrite: "auto" });
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

    // 6. Responsive GSAP Horizontal Scroll Pinning for Portfolio
    const mm = gsap.matchMedia();
    
    // Apply horizontal scroll only on desktops (>900px width)
    mm.add("(min-width: 901px)", () => {
      const track = document.querySelector(".horizontal-scroll-track");
      
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 64), // Offset for layout wrapper padding
        ease: "none", // REQUIRED for smooth scrolling alignment
        scrollTrigger: {
          trigger: ".horizontal-scroll-container",
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true, // Recalculate dimensions on window resize
        }
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
      mm.revert();
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
        
        {/* Hero Section */}
        <section id="about" className="hero-section">
          <div className="hero-grid">
            <div className="hero-left">
              <span className="mono-label reveal-hero">[ CREARENA BUSINESS ACCELERATOR ]</span>
              <h1 className="hero-title reveal-hero">
                Startups <br />
                Start Here.
              </h1>
              <p className="hero-description reveal-hero">
                An elite ecosystem where high-value collective intelligence meets top-tier mentorship, multidisciplinary coaching, and premium collaborative workspaces.
              </p>
              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-number">+136</div>
                  <div className="stat-label">Startups Accelerated</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">$2.4B+</div>
                  <div className="stat-label">Capital Raised</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Retention Rate</div>
                </div>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-visual-frame">
                {/* Micro frame indicators */}
                <div className="crosshair" style={{ top: "-5px", left: "-5px" }}></div>
                <div className="crosshair" style={{ top: "-5px", right: "-5px" }}></div>
                <div className="crosshair" style={{ bottom: "-5px", left: "-5px" }}></div>
                <div className="crosshair" style={{ bottom: "-5px", right: "-5px" }}></div>
                
                {/* Dynamic WebGL gooey 3D Canvas */}
                <ThreeCanvas modelPath={null} />
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

        {/* Portfolio Showcase Section (GSAP Horizontal Scroll) */}
        <section id="portfolio" className="horizontal-scroll-container">
          <div className="horizontal-scroll-track">
            
            {/* Intro Slide */}
            <div className="horizontal-intro-card">
              <span className="mono-label">[ CHRONOLOGY OF GROWTH ]</span>
              <h2 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.6rem)", marginTop: "1.2rem", textTransform: "uppercase" }}>
                The Crearena Portfolio
              </h2>
              <p style={{ color: "var(--text-muted)", marginTop: "1.2rem", fontWeight: "300", lineHeight: "1.6" }}>
                Invested in and scaled by Crearena. Drag/scroll to reveal our active category leaders.
              </p>
            </div>

            {/* Brand Timeline Cards */}
            {brands.map((brand, idx) => (
              <div key={idx} className="brand-timeline-card">
                <div className="brand-card-top">
                  <span className="mono-label" style={{ fontSize: "0.6rem" }}>
                    STG {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="glow-dot"></span>
                </div>
                
                <div className="brand-card-logo-wrap">
                  <Image 
                    src={`/assets/brands/${brand.file}`} 
                    alt={`${brand.name} Logo`} 
                    width={140} 
                    height={70} 
                    className="brand-logo-img"
                    priority={idx < 4}
                  />
                </div>

                <div style={{ borderTop: "1px solid var(--grid-color)", paddingTop: "1rem" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {brand.name}
                  </span>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-technical)", marginTop: "0.2rem" }}>
                    Accelerated // Cohort VI
                  </p>
                </div>
              </div>
            ))}

            {/* Final Call To Action Card */}
            <div className="next-opportunity-card">
              <div className="next-card-highlight"></div>
              <div className="brand-card-top" style={{ borderBottom: "none", paddingBottom: "0" }}>
                <span className="mono-label" style={{ color: "var(--accent-color)" }}>COHORT VII / INTAKE</span>
                <span className="glow-dot" style={{ backgroundColor: "var(--accent-color)" }}></span>
              </div>
              
              <div style={{ margin: "2rem 0" }}>
                <h3 style={{ fontSize: "2.4rem", textTransform: "uppercase", marginBottom: "1rem", lineHeight: "1.05" }}>
                  You Could <br />
                  Be Next.
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.5", fontWeight: "300" }}>
                  Join the cohort of category-defining founders and scale your startup with elite capital and intelligence.
                </p>
              </div>

              <button className="btn-premium" style={{ width: "100%" }}>INQUIRE NOW</button>
            </div>

          </div>
        </section>

        {/* Accelerator Pillars */}
        <section id="pillars" className="section-padding" style={{ position: "relative", backgroundColor: "var(--bg-darker)" }}>
          <div className="grid-line-h" style={{ top: "0" }}></div>
          
          <div style={{ marginBottom: "5rem" }} className="section-reveal">
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
          
          <div style={{ marginBottom: "4rem" }} className="section-reveal">
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
