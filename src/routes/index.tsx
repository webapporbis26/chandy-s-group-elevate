import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  ChevronDown,
  Clock,
  Cpu,
  Hammer,
  HandshakeIcon,
  Home,
  Hotel,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Smile,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import constructionsImg from "@/assets/constructions.jpg";
import homesImg from "@/assets/homes.jpg";
import hotelsImg from "@/assets/hotels.jpg";
import buildersImg from "@/assets/builders.jpg";
import restaurantImg from "@/assets/restaurant.jpg";
import excellenceImg from "@/assets/excellence.jpg";
import logoImg from "@/assets/builders-removebg-preview.png";
import homeDeskImg from "@/assets/home_desk.png";
import homeMobImg from "@/assets/home_mob.png";
import constructDeskImg from "@/assets/construct_desk.png";
import constMobImg from "@/assets/const_mob.png";
import resortDeskImg from "@/assets/resort_desk.png";
import resortMobImg from "@/assets/resort_mob.png";
import restDeskImg from "@/assets/rest_desk.png";
import restMobImg from "@/assets/rest_mob.png";

export const Route = createFileRoute("/")({
  component: Landing,
});

/* ------------------------------------------------------------------ */
/*  Reveal on scroll                                                   */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 1s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
const NAV = [
  { label: "Home", href: "#home" },
  { label: "Our Companies", href: "#companies" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "saturate(160%) blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-2 md:px-10 md:py-3">
        <a
          href="#home"
          className="flex items-center"
        >
          <img
            src={logoImg}
            alt="Chandy's Group Logo"
            className="h-[90px] md:h-[140px] w-auto object-contain shrink-0 my-[-30px] md:my-[-50px]"
            style={{
              filter: scrolled ? "brightness(0)" : "none",
              transition: "filter 0.3s ease",
            }}
          />
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group relative text-[13px] font-medium tracking-wide transition-colors"
              style={{ color: scrolled ? "var(--ink)" : "rgba(255,255,255,0.9)" }}
            >
              {n.label}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: "var(--gold)" }}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full px-5 py-2.5 text-[13px] font-medium tracking-wide transition-all duration-500 md:inline-flex"
            style={{
              background: scrolled ? "var(--ink)" : "rgba(255,255,255,0.12)",
              color: scrolled ? "var(--paper)" : "#fff",
              border: scrolled ? "1px solid var(--ink)" : "1px solid rgba(255,255,255,0.35)",
              backdropFilter: scrolled ? "none" : "blur(10px)",
            }}
          >
            Contact Us
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full lg:hidden"
            style={{
              color: scrolled ? "var(--ink)" : "#fff",
              border: scrolled ? "1px solid var(--line)" : "1px solid rgba(255,255,255,0.3)",
            }}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="lg:hidden"
          style={{
            background: "var(--paper)",
            borderTop: "1px solid var(--line)",
          }}
        >
          <div className="flex flex-col gap-1 px-6 py-6">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b py-3 text-sm"
                style={{ color: "var(--ink)", borderColor: "var(--line)" }}
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full px-5 py-3 text-center text-sm"
              style={{ background: "var(--ink)", color: "var(--paper)" }}
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 1 — Hero                                                   */
/* ------------------------------------------------------------------ */
function Hero() {
  const SLIDES = [
    {
      imgDesk: homeDeskImg,
      imgMob: homeMobImg,
      tag: "Homes",
      title: "Bricks, Mortars &",
      titleItalic: "A Touch of Love.",
      desc: "Chandy's Homes turns spaces into beautiful stories. Crafting elegant custom villas and family apartments built to stand the test of time.",
      link: "https://chandys.co.in/chandys-homes.html",
    },
    {
      imgDesk: constructDeskImg,
      imgMob: constMobImg,
      tag: "Construction",
      title: "Building Trust.",
      titleItalic: "Creating Excellence.",
      desc: "Trailblazer builders in the construction landscape of Kerala, engineering landmark structures from first sketch to final key.",
      link: "https://chandys.co.in/chandys-construction.html",
    },
    {
      imgDesk: resortDeskImg,
      imgMob: resortMobImg,
      tag: "Resorts",
      title: "Windy Woods.",
      titleItalic: "Drizzle Drops.",
      desc: "Discover quiet luxury, breathtaking natural landscapes, and curated boutique hospitality designed to create timeless resort memories.",
      link: "https://chandys.co.in/chandys-hotels-resorts.html",
    },
    {
      imgDesk: restDeskImg,
      imgMob: restMobImg,
      tag: "Restaurant",
      title: "Ente Amma.",
      titleItalic: "Authentic Culinary.",
      desc: "Indulge in authentic traditional tastes of Kerala, served with warmth and passion at our landmark Ente Amma Restaurant.",
      link: "https://chandys.co.in/ente-amma-restaurant.html",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[activeSlide];

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background Images with cross-fade */}
      {SLIDES.map((s, idx) => (
        <div
          key={s.tag}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            activeSlide === idx ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          {/* Mobile Image */}
          <img
            src={s.imgMob}
            alt={`${s.tag} mobile`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[6000ms] ease-out scale-105 md:hidden"
            style={{ transform: activeSlide === idx ? "scale(1.01)" : "scale(1.05)" }}
          />
          {/* Desktop Image */}
          <img
            src={s.imgDesk}
            alt={`${s.tag} desktop`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[6000ms] ease-out scale-105 hidden md:block"
            style={{ transform: activeSlide === idx ? "scale(1.01)" : "scale(1.05)" }}
          />
        </div>
      ))}

      {/* Hero Gradients */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,12,0.6) 0%, rgba(10,10,12,0.4) 40%, rgba(10,10,12,0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-40 z-10"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.55), transparent)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-6 pb-24 pt-32 md:px-10 md:pb-32">
        <div className="max-w-4xl text-white">
          <Reveal>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-14" style={{ background: "var(--gold)" }} />
              <span
                className="text-[11px] tracking-[0.4em] uppercase"
                style={{ color: "var(--gold-soft)" }}
              >
                Chandy's Group · {slide.tag}
              </span>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <h1
              className="text-[clamp(1.9rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {slide.title}
              <br />
              <span style={{ fontStyle: "italic", color: "var(--gold-soft)" }}>{slide.titleItalic}</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/80 md:mt-8 md:text-lg">
              {slide.desc}
            </p>
          </Reveal>
          <Reveal delay={450}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={slide.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink"
                style={{ background: "var(--gold)", color: "var(--ink)", boxShadow: "0 20px 40px -20px rgba(200,167,106,0.55)" }}
              >
                Explore {slide.tag}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="btn-ghost">Contact Us</a>
            </div>
          </Reveal>
        </div>

        {/* Slide navigation controls */}
        <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-10 flex items-center justify-between z-30">
          <div className="flex gap-3 md:gap-6 overflow-x-auto no-scrollbar">
            {SLIDES.map((s, idx) => (
              <button
                key={s.tag}
                onClick={() => setActiveSlide(idx)}
                className={`group flex flex-col items-start transition-all ${
                  activeSlide === idx ? "text-white" : "text-white/40 hover:text-white/80"
                }`}
              >
                <span className="text-[10px] md:text-[11px] uppercase tracking-widest font-medium whitespace-nowrap">
                  {s.tag}
                </span>
                <div
                  className={`h-0.5 w-12 transition-all mt-2 ${
                    activeSlide === idx ? "bg-[color:var(--gold)] w-16" : "bg-white/20"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="pointer-events-none hidden md:flex flex-col items-center gap-2 text-white/70">
            <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
            <ChevronDown className="h-4 w-4 animate-scroll-hint" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 — About                                                  */
/* ------------------------------------------------------------------ */
function About() {
  const pillars = [
    { k: "1994", v: "Founded" },
    { k: "Vision", v: "Ahead of the times" },
    { k: "Trust", v: "Customer first" },
    { k: "Quality", v: "Industry benchmark" },
  ];
  return (
    <section id="about" className="relative py-6 md:py-10">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 md:px-10 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={aboutImg}
              alt="Architect at work"
              width={1200}
              height={1400}
              loading="lazy"
              className="h-[400px] w-full object-cover md:h-[520px]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 100%)",
              }}
            />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase opacity-80">Est.</div>
                <div
                  className="text-5xl leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  1994
                </div>
              </div>
              <div className="hidden text-right text-xs opacity-80 md:block">
                Kerala, India
              </div>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:pt-4">
          <Reveal>
            <div className="mb-4 flex items-center gap-3">
              <span className="gold-rule" />
              <span className="eyebrow">About Chandy's Group</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-[clamp(1.75rem,3.8vw,2.8rem)] leading-[1.05]">
              A legacy of craftsmanship,
              <br />
              built to stand the test of time.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-6 space-y-4 text-[15px] leading-[1.75] text-[color:var(--ink-soft)] md:text-base">
              <p>
                We started our journey in 1994. Since then, we've been touted as trailblazer
                builders in the construction landscape of Kerala. Beyond bricks and mortars,
                we build your dreams. We know the value of dreams. Hence, all that goes into
                every touchpoint of the construction is benchmarked against the highest
                standard in the industry.
              </p>
              <p>
                Our in-house team ideates and builds structures that are ahead of the times.
                Whether it is a soaring apartment or a community villa project, our buildings
                leave a signature that speaks for our excellence.
              </p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 border-y py-6" style={{ borderColor: "var(--line)" }}>
              {pillars.map((p) => (
                <div key={p.k}>
                  <div
                    className="text-xl md:text-2xl"
                    style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                  >
                    {p.k}
                  </div>
                  <div className="mt-1 text-xs tracking-wide text-[color:var(--ink-soft)]">
                    {p.v}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={400}>
            <a href="#companies" className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
              Read More
              <span className="grid h-9 w-9 place-items-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: "var(--ink)", color: "var(--paper)" }}>
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — Companies (Bento)                                      */
/* ------------------------------------------------------------------ */
type Company = {
  name: string;
  desc: string;
  img: string;
  Icon: typeof Building2;
  link: string;
};

const COMPANIES: Company[] = [
  {
    name: "Chandy's Constructions",
    desc: "Trailblazer builders shaping Kerala's skyline with apartments and community projects benchmarked against the highest industry standards.",
    img: constructionsImg,
    Icon: Building2,
    link: "https://chandys.co.in/chandys-construction.html",
  },
  {
    name: "Chandy's Homes",
    desc: "Where passion and professionalism meet. Beautiful abodes built with a deep connection to those who will call them home.",
    img: homesImg,
    Icon: Home,
    link: "https://chandys.co.in/chandys-homes.html",
  },
  {
    name: "Chandy's Hotels & Resorts",
    desc: "Signature hospitality experiences including Windy Woods and Drizzle Drops — retreats crafted for quiet luxury.",
    img: hotelsImg,
    Icon: Hotel,
    link: "https://chandys.co.in/chandys-hotels-resorts.html",
  },
  {
    name: "Chandy's Builders",
    desc: "Expert construction execution blending traditional craftsmanship with modern engineering to deliver landmark projects.",
    img: buildersImg,
    Icon: Hammer,
    link: "https://chandys.co.in/chandys-builders.html",
  },
  {
    name: "Restaurant Ente Amma",
    desc: "A warm culinary home celebrating the flavours of Kerala with heart, hospitality and heritage on every plate.",
    img: restaurantImg,
    Icon: UtensilsCrossed,
    link: "https://chandys.co.in/ente-amma-restaurant.html",
  },
];

function CompanyCard({ c, large = false }: { c: Company; large?: boolean }) {
  return (
    <a
      href={c.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden rounded-3xl ${large ? "lg:col-span-2 lg:row-span-2" : ""}`}
      style={{ minHeight: large ? 420 : 280, boxShadow: "var(--shadow-card)" }}
    >
      <img
        src={c.img}
        alt={c.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,15,17,0.15) 0%, rgba(15,15,17,0.45) 55%, rgba(15,15,17,0.9) 100%)",
        }}
      />
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-between p-6 text-white md:p-8">
        <div className="flex items-start justify-between">
          <span
            className="grid h-11 w-11 place-items-center rounded-full backdrop-blur-md"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            <c.Icon className="h-5 w-5" />
          </span>
          <span
            className="grid h-11 w-11 place-items-center rounded-full transition-all duration-500 group-hover:rotate-45"
            style={{ background: "var(--gold)", color: "var(--ink)" }}
          >
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8" style={{ background: "var(--gold)" }} />
            <span className="text-[10px] tracking-[0.35em] uppercase" style={{ color: "var(--gold-soft)" }}>
              Group Company
            </span>
          </div>
          <h3
            className={`${large ? "text-2xl md:text-4xl lg:text-5xl" : "text-xl md:text-2xl lg:text-3xl"} leading-[1.05]`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {c.name}
          </h3>
          <p className={`mt-3 max-w-lg text-sm leading-relaxed text-white/80 ${large ? "md:text-base" : ""}`}>
            {c.desc}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium tracking-wide">
            Explore Company
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </a>
  );
}

function Companies() {
  return (
    <section id="companies" className="relative pt-6 pb-10 md:pt-10 md:pb-14" style={{ background: "var(--paper)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="gold-rule" />
                <span className="eyebrow">Our Group of Companies</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-[clamp(1.75rem,3.8vw,2.8rem)] leading-[1.05]">
                Delivering excellence
                <br />
                across <em style={{ color: "var(--gold)" }}>multiple industries.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="max-w-md text-[15px] leading-relaxed text-[color:var(--ink-soft)]">
              A family of companies united by a single commitment — to build with innovation,
              quality and decades of trusted expertise.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[300px]">
            <CompanyCard c={COMPANIES[0]} large />
            <CompanyCard c={COMPANIES[1]} />
            <CompanyCard c={COMPANIES[2]} />
            <CompanyCard c={COMPANIES[3]} />
            <CompanyCard c={COMPANIES[4]} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}





/* ------------------------------------------------------------------ */
/*  Section 6 — Business Excellence                                    */
/* ------------------------------------------------------------------ */
function Excellence() {
  const pillars = [
    {
      k: "Quality",
      v: "Highest industry standard in every material and finish we deliver.",
      Icon: Award,
    },
    {
      k: "Technology",
      v: "Modern methods and advanced materials for stronger tomorrow.",
      Icon: Cpu,
    },
    {
      k: "Team",
      v: "In-house professionals with experience, dedication, and attention to detail.",
      Icon: Users,
    },
    {
      k: "Innovation",
      v: "Ahead of the times with creative solutions that build the future, today.",
      Icon: Sparkles,
    },
    {
      k: "Customers",
      v: "Built on trust, delivering long-term relationships and lasting satisfaction.",
      Icon: ShieldCheck,
    },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0a0a0a", color: "var(--paper)" }}
    >
      {/* Architecture image — right half overlay */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] pointer-events-none">
        <img
          src={excellenceImg}
          alt="Modern glass architecture"
          loading="lazy"
          className="h-full w-full object-cover object-center opacity-60"
        />
        {/* Left fade to black */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #0a0a0a 0%, rgba(10,10,10,0.85) 30%, rgba(10,10,10,0.3) 70%, transparent 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.9) 85%, #0a0a0a 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Single row: heading left, pillars right — same height */}
        <div className="grid gap-10 pt-4 pb-4 md:pt-5 md:pb-5 lg:grid-cols-12 lg:gap-16 items-center">

          {/* Left: Heading + Body */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="gold-rule" />
                <span className="eyebrow" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Business Excellence
                </span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-medium text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Excellence is
                <br />
                not a moment.
                <br />
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                  It is a discipline.
                </em>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-6 h-px w-12" style={{ background: "var(--gold)" }} />
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-6 text-[15px] leading-[1.85] text-white/60 max-w-sm">
                From the very moment of ideating the sketches to handing over the keys, we
                meticulously select the materials of the highest possible standard. The result
                is dream buildings that stand the test of time — blending the best of both
                traditional and modern construction techniques.
              </p>
            </Reveal>
          </div>

          {/* Right: 5 Pillars overlaid on the building image area */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-3 md:grid-cols-5 gap-0">
              {pillars.map((p, i) => (
                <Reveal key={p.k} delay={i * 80}>
                  <div
                    className={`flex flex-col items-center text-center px-2 py-2 md:px-3 ${
                      i < pillars.length - 1 ? "md:border-r md:border-white/[0.08]" : ""
                    }`}
                  >
                    {/* Circular outlined icon */}
                    <span
                      className="grid h-12 w-12 place-items-center rounded-full mb-4"
                      style={{
                        border: "1px solid rgba(200,167,106,0.45)",
                        background: "rgba(200,167,106,0.07)",
                      }}
                    >
                      <p.Icon className="h-5 w-5" style={{ color: "var(--gold)" }} />
                    </span>
                    <span
                      className="text-base md:text-lg text-white mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.k}
                    </span>
                    <span
                      className="mb-2 h-px w-6 block"
                      style={{ background: "var(--gold)", opacity: 0.45 }}
                    />
                    <p className="text-[10px] md:text-[11px] leading-relaxed text-white/45 max-w-[110px]">
                      {p.v}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 7 — Featured Business Highlights                           */
/* ------------------------------------------------------------------ */
const FEATURES = [
  {
    tag: "Homes",
    title: "Bricks, mortars &",
    titleGold: "a touch of love.",
    body: "Chandy's Homes is where passion and professionalism take center stage. For us, a home holds a deep connection with its inhabitants — so we mix bricks and mortars with a touch of love to turn spaces into beautiful stories.",
    img: homesImg,
    link: "https://chandys.co.in/chandys-homes.html",
    subFeatures: [
      { name: "Thoughtful Design", Icon: Hammer },
      { name: "Premium Quality", Icon: Award },
      { name: "Personalized Approach", Icon: Users },
    ],
  },
  {
    tag: "Hotels & Resorts",
    title: "Signature retreats.",
    titleGold: "Windy Woods & Drizzle Drops.",
    body: "Our hospitality portfolio brings the same craftsmanship to leisure — quiet, elegant retreats where design, service and setting come together to create unforgettable stays.",
    img: hotelsImg,
    link: "https://chandys.co.in/chandys-hotels-resorts.html",
    subFeatures: [
      { name: "Luxury Living", Icon: Hotel },
      { name: "Premium Service", Icon: Sparkles },
      { name: "Scenic Locations", Icon: MapPin },
    ],
  },
  {
    tag: "Constructions",
    title: "Structures that are",
    titleGold: "ahead of the times.",
    body: "Whether it is a soaring apartment or a community villa project, our buildings leave a signature that speaks for our excellence — engineered in-house from first sketch to final key.",
    img: constructionsImg,
    link: "https://chandys.co.in/chandys-construction.html",
    subFeatures: [
      { name: "Modern Methods", Icon: Cpu },
      { name: "Quality Materials", Icon: ShieldCheck },
      { name: "Expert Team", Icon: HandshakeIcon },
    ],
  },
];

function Featured() {
  const [activeTab, setActiveTab] = useState(0);
  const active = FEATURES[activeTab];

  const STATS = [
    { val: "50+", label: "Homes Built", Icon: Home },
    { val: "100+", label: "Happy Families", Icon: Smile },
    { val: "10+", label: "Years of Trust", Icon: Award },
    { val: "Kerala", label: "& Beyond", Icon: MapPin },
  ];

  return (
    <section className="relative py-6 md:py-10 overflow-hidden">
      {/* Faint Background Watermark matching layout */}
      <div className="absolute right-[-4rem] top-0 text-[20rem] font-bold text-black/5 opacity-[0.02] select-none pointer-events-none font-display leading-none">
        CH
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header Block */}
        <div className="mb-12 max-w-3xl">
          <Reveal>
            <div className="mb-5 flex items-center gap-3">
              <span className="gold-rule" />
              <span className="eyebrow">Featured Highlights</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-[clamp(1.75rem,3.8vw,2.8rem)] leading-[1.05]">
              A closer look at
              <br />
              <em style={{ color: "var(--gold)" }}>what we do best.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-sm text-[color:var(--ink-soft)] leading-relaxed">
              Thoughtful design. Timeless quality.<br />
              Spaces made for life.
            </p>
          </Reveal>
        </div>

        {/* Tab Selection menu */}
        <div className="mb-8 flex flex-wrap gap-x-8 gap-y-4 border-b border-line pb-4">
          {FEATURES.map((f, idx) => (
            <button
              key={f.tag}
              onClick={() => setActiveTab(idx)}
              className={`pb-4 text-xs font-semibold tracking-widest uppercase transition-all relative ${
                activeTab === idx ? "text-[color:var(--ink)]" : "text-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
              }`}
            >
              <span className="mr-2 text-[10px] opacity-60">0{idx + 1}</span>
              {f.tag}
              {activeTab === idx && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[color:var(--gold)]" />
              )}
            </button>
          ))}
        </div>

        {/* Main Card Element */}
        <div className="overflow-hidden rounded-[32px] bg-[#111] grid lg:grid-cols-12" style={{ boxShadow: "var(--shadow-luxe)" }}>
          {/* Left: Image Side */}
          <div className="lg:col-span-7 relative h-[240px] sm:h-[300px] lg:h-[500px] overflow-hidden">
            <img
              src={active.img}
              alt={active.tag}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms]"
              style={{ borderRadius: "32px 32px 0 0" }}
            />
            {/* Soft gold accent rule at bottom of image on mobile */}
            <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[color:var(--gold)] lg:hidden" />
          </div>

          {/* Right: Content Side */}
          <div className="lg:col-span-5 p-6 md:p-8 lg:p-10 flex flex-col justify-between text-white bg-[#151515] relative">
            <div>
              {/* Card Tag */}
              <div className="flex items-center gap-3 text-white/50 text-[10px] tracking-widest uppercase">
                <span>0{activeTab + 1}</span>
                <span className="h-px w-8 bg-white/20" />
                <span>{active.tag}</span>
              </div>

              {/* Card Title */}
              <h3 className="mt-4 md:mt-6 text-2xl md:text-3xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                {active.title} <br />
                <span className="italic text-[color:var(--gold-soft)]">{active.titleGold}</span>
              </h3>

              <div className="mt-4 h-px w-12 bg-white/10" />

              {/* Description body */}
              <p className="mt-5 text-sm leading-relaxed text-white/70">
                {active.body}
              </p>
            </div>

            {/* Sub-features & CTA Button */}
            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/10">
              <div className="grid grid-cols-3 gap-2 mb-8">
                {active.subFeatures.map((sf) => (
                  <div key={sf.name} className="flex flex-col items-center text-center">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-[color:var(--gold-soft)] mb-2">
                      <sf.Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] leading-tight text-white/60">
                      {sf.name}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={active.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--gold)] py-3.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--ink)] transition-all duration-300 hover:bg-[color:var(--gold-soft)]"
              >
                Explore Our {active.tag}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats Strip below card */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-line pt-8">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-[color:var(--gold)] bg-white/50">
                <s.Icon className="h-4.5 w-4.5" />
              </span>
              <div>
                <div className="text-xl font-bold leading-none text-[color:var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                  {s.val}
                </div>
                <div className="mt-1 text-[10px] text-[color:var(--ink-soft)] uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 8 — Values                                                 */
/* ------------------------------------------------------------------ */
function Values() {
  const values = [
    { name: "Integrity", Icon: ShieldCheck },
    { name: "Quality", Icon: Award },
    { name: "Commitment", Icon: HandshakeIcon },
    { name: "Trust", Icon: Users },
    { name: "Innovation", Icon: Sparkles },
  ];

  return (
    <section className="relative py-6 md:py-10" style={{ background: "var(--canvas)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8 items-start">

          {/* LEFT: Heading + sketch */}
          <div className="lg:col-span-4 flex flex-col">
            <Reveal>
              <div className="mb-4 flex items-center gap-3">
                <span className="gold-rule" />
                <span className="eyebrow">Our Values</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="text-[clamp(2.6rem,4.5vw,4rem)] leading-[1.02] font-medium"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                What we
                <br />
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>strive for.</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-5 h-px w-10" style={{ background: "var(--gold)" }} />
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-5 text-[14px] leading-[1.8]" style={{ color: "var(--ink-soft)" }}>
                Leaving a trail of excellence — a philosophy that guides every project,
                every partnership and every promise we make.
              </p>
            </Reveal>
            {/* Architectural sketch */}
            <Reveal delay={300}>
              <div className="mt-8 opacity-20 select-none pointer-events-none hidden md:block" style={{ color: "var(--ink)" }}>
                <svg viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[260px]">
                  <rect x="30" y="80" width="200" height="130" stroke="currentColor" strokeWidth="1" />
                  <rect x="70" y="110" width="35" height="55" stroke="currentColor" strokeWidth="0.8" />
                  <rect x="155" y="110" width="35" height="55" stroke="currentColor" strokeWidth="0.8" />
                  <rect x="100" y="130" width="60" height="80" stroke="currentColor" strokeWidth="0.8" />
                  <polyline points="10,80 130,20 250,80" stroke="currentColor" strokeWidth="1" />
                  <line x1="30" y1="80" x2="30" y2="210" stroke="currentColor" strokeWidth="0.7" />
                  <line x1="230" y1="80" x2="230" y2="210" stroke="currentColor" strokeWidth="0.7" />
                  <rect x="45" y="100" width="16" height="12" stroke="currentColor" strokeWidth="0.6" />
                  <rect x="199" y="100" width="16" height="12" stroke="currentColor" strokeWidth="0.6" />
                  <rect x="45" y="125" width="16" height="12" stroke="currentColor" strokeWidth="0.6" />
                  <rect x="199" y="125" width="16" height="12" stroke="currentColor" strokeWidth="0.6" />
                  <line x1="0" y1="210" x2="260" y2="210" stroke="currentColor" strokeWidth="0.8" />
                  <line x1="8" y1="210" x2="8" y2="178" stroke="currentColor" strokeWidth="0.6" />
                  <ellipse cx="8" cy="167" rx="11" ry="13" stroke="currentColor" strokeWidth="0.6" />
                  <line x1="252" y1="210" x2="252" y2="178" stroke="currentColor" strokeWidth="0.6" />
                  <ellipse cx="252" cy="167" rx="11" ry="13" stroke="currentColor" strokeWidth="0.6" />
                </svg>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Cards */}
          <div className="lg:col-span-8 flex flex-col gap-4">

            {/* Top row: Mission + Vision */}
            <div className="grid gap-4 md:grid-cols-2">

              {/* Mission card - light */}
              <Reveal delay={80}>
                <div
                  className="relative overflow-hidden rounded-3xl flex flex-col justify-between"
                  style={{ background: "var(--paper)", border: "1px solid var(--line)", minHeight: 300 }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="grid h-11 w-11 place-items-center rounded-full shrink-0"
                        style={{ border: "1.5px solid var(--gold)", background: "rgba(200,167,106,0.08)" }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--gold)" }}>
                          <path d="M3 17L9 7l4 6 3-4 5 8H3z" strokeLinejoin="round" />
                          <path d="M13 7V3l3 2-3 2z" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div>
                        <div className="text-[9px] font-semibold tracking-[0.35em] uppercase" style={{ color: "var(--gold)" }}>Our Mission</div>
                        <div className="mt-1 h-px w-8" style={{ background: "var(--gold)" }} />
                      </div>
                    </div>
                    <p className="text-[1.15rem] leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                      To build structures that go beyond bricks and mortars — turning dreams into signatures of excellence.
                    </p>
                  </div>
                  {/* Building photo strip */}
                  <div className="relative h-24 overflow-hidden">
                    <img src={constructionsImg} alt="Building" className="absolute inset-0 w-full h-full object-cover object-center" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--paper) 0%, transparent 60%)" }} />
                  </div>
                </div>
              </Reveal>

              {/* Vision card - dark */}
              <Reveal delay={160}>
                <div
                  className="relative overflow-hidden rounded-3xl flex flex-col justify-between"
                  style={{ background: "#111", minHeight: 300 }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="grid h-11 w-11 place-items-center rounded-full shrink-0"
                        style={{ border: "1.5px solid var(--gold)", background: "rgba(200,167,106,0.08)" }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--gold)" }}>
                          <ellipse cx="12" cy="12" rx="9" ry="5.5" />
                          <circle cx="12" cy="12" r="2.5" />
                        </svg>
                      </span>
                      <div>
                        <div className="text-[9px] font-semibold tracking-[0.35em] uppercase" style={{ color: "var(--gold)" }}>Our Vision</div>
                        <div className="mt-1 h-px w-8" style={{ background: "var(--gold)" }} />
                      </div>
                    </div>
                    <p className="text-[1.15rem] leading-snug text-white" style={{ fontFamily: "var(--font-display)" }}>
                      To ideate and build structures that are ahead of the times, blending tradition with modern craft.
                    </p>
                  </div>
                  {/* City skyline */}
                  <div className="relative h-20 overflow-hidden">
                    <svg viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" style={{ opacity: 0.3 }}>
                      <rect x="20" y="20" width="28" height="60" fill="var(--gold)" />
                      <rect x="53" y="38" width="18" height="42" fill="var(--gold)" />
                      <rect x="76" y="5" width="38" height="75" fill="var(--gold)" />
                      <rect x="120" y="28" width="22" height="52" fill="var(--gold)" />
                      <rect x="148" y="14" width="32" height="66" fill="var(--gold)" />
                      <rect x="186" y="34" width="18" height="46" fill="var(--gold)" />
                      <rect x="210" y="8" width="42" height="72" fill="var(--gold)" />
                      <rect x="258" y="26" width="26" height="54" fill="var(--gold)" />
                      <rect x="290" y="42" width="20" height="38" fill="var(--gold)" />
                      <rect x="316" y="18" width="36" height="62" fill="var(--gold)" />
                      <rect x="358" y="38" width="22" height="42" fill="var(--gold)" />
                    </svg>
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #111 0%, transparent 70%)" }} />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Core Values — full-width dark card */}
            <Reveal delay={240}>
              <div className="rounded-3xl p-6 md:p-8" style={{ background: "#111" }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px" style={{ background: "rgba(200,167,106,0.2)" }} />
                  <span className="text-[9px] font-semibold tracking-[0.45em] uppercase whitespace-nowrap" style={{ color: "var(--gold)" }}>
                    Core Values
                  </span>
                  <div className="flex-1 h-px" style={{ background: "rgba(200,167,106,0.2)" }} />
                </div>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 md:gap-x-14">
                  {values.map((v) => (
                    <div key={v.name} className="flex flex-col items-center gap-2 text-center">
                      <span
                        className="grid h-12 w-12 place-items-center rounded-full"
                        style={{ border: "1.5px solid var(--gold)", background: "rgba(200,167,106,0.06)" }}
                      >
                        <v.Icon className="h-5 w-5" style={{ color: "var(--gold)" }} />
                      </span>
                      <span className="text-sm text-white/80" style={{ fontFamily: "var(--font-display)" }}>
                        {v.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 9 — Contact                                                */
/* ------------------------------------------------------------------ */
function Contact() {
  const contacts = [
    {
      Icon: MapPin,
      label: "Head Office",
      value: "Chandy's AAA Centre,\nEttumanoor, Kerala, India",
      href: "https://maps.google.com/?q=Chandy's+AAA+Centre,+Ettumanoor,+Kerala,+India",
    },
    {
      Icon: Phone,
      label: "Mobile",
      value: "+91 98959 79999",
      href: "tel:+919895979999",
    },
    {
      Icon: Mail,
      label: "Email",
      value: "info@chandysbuilders.com",
      href: "mailto:info@chandysbuilders.com",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-4 md:py-6 overflow-hidden"
      style={{ background: "var(--paper)" }}
    >
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Big rounded card wrapping entire contact area */}
        <div
          className="relative rounded-3xl p-6 md:p-10"
          style={{
            background: "var(--canvas)",
            border: "1px solid var(--line)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
          }}
        >
          {/* Dot pattern bottom-left */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 opacity-25"
            style={{
              backgroundImage: "radial-gradient(circle, var(--gold) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-start">

          {/* ── LEFT ── */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="gold-rule" />
                <span className="eyebrow">Contact</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2
                className="text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.08] font-medium"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                Let's Build
                <br />
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>the Future</em>
                <br />
                Together.
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <div className="h-px w-12" style={{ background: "var(--gold)" }} />
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                Have a project in mind? We'd love to hear about it.
                Reach out to us and let's create something extraordinary.
              </p>
            </Reveal>

            {/* Contact items */}
            <div className="flex flex-col gap-0">
              {contacts.map((c, i) => (
                <Reveal key={c.label} delay={260 + i * 60}>
                  <a
                    href={c.href}
                    target={c.label === "Head Office" ? "_blank" : undefined}
                    rel={c.label === "Head Office" ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 py-3 transition-opacity hover:opacity-70 active:opacity-50"
                    style={{
                      borderBottom: i < contacts.length - 1 ? "1px solid var(--line)" : "none",
                      textDecoration: "none",
                    }}
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors"
                      style={{ border: "1.5px solid var(--gold)", color: "var(--gold)" }}
                    >
                      <c.Icon className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <div
                        className="mb-1 text-[10px] font-semibold tracking-[0.35em] uppercase"
                        style={{ color: "var(--gold)" }}
                      >
                        {c.label}
                      </div>
                      <div
                        className="text-[14px] leading-snug whitespace-pre-line"
                        style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}
                      >
                        {c.value}
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            {/* Response time card */}
          </div>


          {/* ── RIGHT — Form Card ── */}
          <div className="lg:col-span-7">
            <Reveal delay={150}>
              <div
                className="rounded-3xl p-5 md:p-7 relative overflow-hidden"
                style={{
                  background: "var(--paper)",
                  border: "1px solid var(--line)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                }}
              >
                {/* Architectural sketch top-right */}
                <div className="absolute top-0 right-0 w-36 h-36 opacity-10 pointer-events-none">
                  <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect x="20" y="30" width="80" height="60" stroke="currentColor" strokeWidth="1.2" />
                    <rect x="35" y="50" width="20" height="40" stroke="currentColor" strokeWidth="1" />
                    <rect x="65" y="50" width="20" height="40" stroke="currentColor" strokeWidth="1" />
                    <polyline points="10,30 60,5 110,30" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="20" y1="30" x2="20" y2="90" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="100" y1="30" x2="100" y2="90" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="35" y1="65" x2="55" y2="65" stroke="currentColor" strokeWidth="0.6" />
                    <line x1="65" y1="65" x2="85" y2="65" stroke="currentColor" strokeWidth="0.6" />
                  </svg>
                </div>

                {/* Form header */}
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full"
                    style={{ background: "var(--gold)", color: "white" }}
                  >
                    <Send className="h-4 w-4" />
                  </span>
                  <div>
                    <h3
                      className="text-base font-medium"
                      style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                    >
                      Send Us a Message
                    </h3>
                    <div className="mt-1 h-px w-10" style={{ background: "var(--gold)" }} />
                  </div>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="Full Name" placeholder="Your name" icon={<Users className="h-4 w-4" />} />
                    <Field label="Email" placeholder="you@company.com" type="email" icon={<Mail className="h-4 w-4" />} />
                    <Field label="Phone" placeholder="+91" icon={<Phone className="h-4 w-4" />} />
                    <Field label="Company (Optional)" placeholder="Optional" icon={<Building2 className="h-4 w-4" />} />
                  </div>

                  <div className="mt-3">
                    <label
                      className="block text-[10px] font-semibold tracking-[0.35em] uppercase mb-2"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        rows={3}
                        placeholder="Tell us about your project..."
                        className="w-full resize-none rounded-xl border bg-transparent px-4 py-2.5 text-[13px] outline-none transition-colors"
                        style={{ borderColor: "var(--line)", color: "var(--ink)" }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 w-full flex items-center justify-center gap-3 rounded-full py-3 text-xs font-semibold tracking-[0.18em] uppercase text-white transition-opacity hover:opacity-90"
                    style={{ background: "var(--gold)" }}
                  >
                    Send Message
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  icon,
}: {
  label: string;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-[9px] font-semibold tracking-[0.3em] uppercase mb-1.5"
        style={{ color: "var(--ink-soft)" }}
      >
        {label}
      </label>
      <div className="relative flex items-center">
        {icon && (
          <span
            className="absolute left-4 pointer-events-none"
            style={{ color: "var(--ink-soft)" }}
          >
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className="w-full rounded-full border bg-transparent py-2 text-[13px] outline-none transition-colors"
          style={{
            borderColor: "var(--line)",
            color: "var(--ink)",
            paddingLeft: icon ? "2.75rem" : "1.25rem",
            paddingRight: "1.25rem",
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 10 — Footer                                                */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="mx-auto max-w-[1400px] px-6 pt-6 pb-5 md:pt-8 md:pb-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center">
              <img
                src={logoImg}
                alt="Chandy's Group Logo"
                className="h-[140px] md:h-[180px] w-auto object-contain shrink-0 my-[-50px]"
              />
            </div>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-white/60">
              A diversified business group delivering excellence across construction, homes,
              hotels & resorts and hospitality since 1994.
            </p>
          </div>
          <FooterCol
            title="Our Companies"
            className="lg:col-span-3"
            items={[
              "Chandy's Constructions",
              "Chandy's Homes",
              "Chandy's Hotels & Resorts",
              "Chandy's Builders",
              "Restaurant Ente Amma",
            ]}
          />
          <FooterCol title="Explore" className="lg:col-span-2" items={["Home", "About", "Contact"]} />
          <FooterCol title="Follow" className="lg:col-span-3" items={["LinkedIn", "Instagram", "Facebook", "YouTube"]} />
        </div>
 
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t pt-8 text-xs text-white/50 md:flex-row md:items-center" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div>© {new Date().getFullYear()} Chandy's Group of Companies. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="h-px w-6" style={{ background: "var(--gold)" }} />
            <span className="tracking-[0.3em] uppercase">Since 1994</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
 
function FooterCol({ title, items, className = "lg:col-span-2" }: { title: string; items: string[]; className?: string }) {
  return (
    <div className={className}>
      <div className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>
        {title}
      </div>
      <ul className="mt-6 space-y-3 text-sm text-white/70">
        {items.map((it) => (
          <li key={it}>
            <a href="#" className="transition-colors hover:text-white">
              {it}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
function Landing() {
  return (
    <main style={{ background: "var(--canvas)", color: "var(--ink)" }}>
      <Nav />
      <Hero />
      <About />
      <Companies />
      <Excellence />
      <Featured />
      <Values />
      <Contact />
      <Footer />
    </main>
  );
}
