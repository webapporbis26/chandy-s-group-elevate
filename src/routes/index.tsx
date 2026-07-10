import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  ChevronDown,
  Cpu,
  Hammer,
  HandshakeIcon,
  Home,
  Hotel,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
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
  { label: "Journey", href: "#journey" },
  { label: "Why Us", href: "#why" },
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
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-5 md:px-10 md:py-6">
        <a
          href="#home"
          className="flex items-center gap-2"
          style={{ color: scrolled ? "var(--ink)" : "#fff" }}
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-full text-[13px] font-semibold shrink-0"
            style={{
              background: "var(--gold)",
              color: "var(--ink)",
              fontFamily: "var(--font-display)",
            }}
          >
            C
          </span>
          <span className="flex flex-col leading-none">
            <span
              className="text-lg tracking-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Chandy's
            </span>
            <span
              className="mt-0.5 text-[9px] tracking-[0.35em] opacity-70"
              style={{ fontWeight: 500 }}
            >
              GROUP
            </span>
          </span>
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
  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Modern luxury residential architecture at dusk"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: "scale(1.04)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,12,0.55) 0%, rgba(10,10,12,0.35) 40%, rgba(10,10,12,0.75) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.5), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-6 pb-24 pt-40 md:px-10 md:pb-32">
        <div className="max-w-4xl text-white">
          <Reveal>
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-14" style={{ background: "var(--gold)" }} />
              <span
                className="text-[11px] tracking-[0.4em] uppercase"
                style={{ color: "var(--gold-soft)" }}
              >
                Since 1994 · Kerala, India
              </span>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <h1
              className="text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[1.02] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Building Trust.
              <br />
              Creating Excellence.
              <br />
              <span style={{ fontStyle: "italic", color: "var(--gold-soft)" }}>Since 1994.</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              Chandy's Group is a diversified business group delivering excellence across
              multiple industries through innovation, quality, and decades of trusted experience.
            </p>
          </Reveal>
          <Reveal delay={450}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#companies" className="btn-ink" style={{ background: "var(--gold)", color: "var(--ink)", boxShadow: "0 20px 40px -20px rgba(200,167,106,0.55)" }}>
                Explore Companies
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="btn-ghost">Contact Us</a>
            </div>
          </Reveal>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70">
          <div className="flex flex-col items-center gap-2">
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
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 md:px-10 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={aboutImg}
              alt="Architect at work"
              width={1200}
              height={1400}
              loading="lazy"
              className="h-[560px] w-full object-cover md:h-[720px]"
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

        <div className="lg:col-span-6 lg:pt-8">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="gold-rule" />
              <span className="eyebrow">About Chandy's Group</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.05]">
              A legacy of craftsmanship,
              <br />
              built to stand the test of time.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 space-y-6 text-[15px] leading-[1.85] text-[color:var(--ink-soft)] md:text-base">
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
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-y py-8" style={{ borderColor: "var(--line)" }}>
              {pillars.map((p) => (
                <div key={p.k}>
                  <div
                    className="text-2xl md:text-3xl"
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
            <a href="#companies" className="mt-10 inline-flex items-center gap-2 text-sm font-medium">
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
};

const COMPANIES: Company[] = [
  {
    name: "Chandy's Constructions",
    desc: "Trailblazer builders shaping Kerala's skyline with apartments and community projects benchmarked against the highest industry standards.",
    img: constructionsImg,
    Icon: Building2,
  },
  {
    name: "Chandy's Homes",
    desc: "Where passion and professionalism meet. Beautiful abodes built with a deep connection to those who will call them home.",
    img: homesImg,
    Icon: Home,
  },
  {
    name: "Chandy's Hotels & Resorts",
    desc: "Signature hospitality experiences including Windy Woods and Drizzle Drops — retreats crafted for quiet luxury.",
    img: hotelsImg,
    Icon: Hotel,
  },
  {
    name: "Chandy's Builders",
    desc: "Expert construction execution blending traditional craftsmanship with modern engineering to deliver landmark projects.",
    img: buildersImg,
    Icon: Hammer,
  },
  {
    name: "Restaurant Ente Amma",
    desc: "A warm culinary home celebrating the flavours of Kerala with heart, hospitality and heritage on every plate.",
    img: restaurantImg,
    Icon: UtensilsCrossed,
  },
];

function CompanyCard({ c, large = false }: { c: Company; large?: boolean }) {
  return (
    <a
      href="#contact"
      className={`group relative overflow-hidden rounded-3xl ${large ? "lg:col-span-2 lg:row-span-2" : ""}`}
      style={{ minHeight: large ? 620 : 380, boxShadow: "var(--shadow-card)" }}
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
            className={`${large ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"} leading-[1.05]`}
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
    <section id="companies" className="relative py-28 md:py-40" style={{ background: "var(--paper)" }}>
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
              <h2 className="text-[clamp(2rem,4.6vw,4rem)] leading-[1.05]">
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
/*  Section 4 — Journey                                                */
/* ------------------------------------------------------------------ */
const JOURNEY = [
  { year: "1994", title: "Company Founded", desc: "Chandy's begins its journey as trailblazer builders in Kerala." },
  { year: "2000s", title: "Business Expansion", desc: "Growing footprint across residential and community projects." },
  { year: "2010s", title: "New Companies", desc: "Expansion into homes, hotels & resorts and hospitality." },
  { year: "2020s", title: "Industry Leadership", desc: "Recognised for craftsmanship, quality and customer trust." },
  { year: "Today", title: "A Diversified Group", desc: "A family of companies delivering excellence across industries." },
];

function Journey() {
  return (
    <section id="journey" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="mb-5 flex items-center gap-3">
            <span className="gold-rule" />
            <span className="eyebrow">Our Journey</span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="max-w-4xl text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.05]">
            Three decades of building —
            <br />
            <em style={{ color: "var(--gold)" }}>one milestone at a time.</em>
          </h2>
        </Reveal>

        <div className="mt-20 hidden lg:block">
          <div className="relative">
            <div
              className="absolute left-0 right-0 top-[54px] h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--line) 15%, var(--line) 85%, transparent)" }}
            />
            <div className="grid grid-cols-5 gap-4">
              {JOURNEY.map((j, i) => (
                <Reveal key={j.year} delay={i * 120}>
                  <div className="flex flex-col items-start">
                    <div
                      className="text-sm tracking-[0.3em] uppercase"
                      style={{ color: "var(--gold)" }}
                    >
                      {j.year}
                    </div>
                    <div className="mt-6 grid h-6 w-6 place-items-center">
                      <span
                        className="h-3 w-3 rounded-full ring-4"
                        style={{ background: "var(--ink)", boxShadow: "0 0 0 6px var(--canvas)" }}
                      />
                    </div>
                    <h3
                      className="mt-6 text-xl leading-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {j.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                      {j.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="mt-16 lg:hidden">
          <div className="relative pl-8">
            <div className="absolute bottom-0 left-3 top-0 w-px" style={{ background: "var(--line)" }} />
            {JOURNEY.map((j) => (
              <div key={j.year} className="relative mb-10">
                <span
                  className="absolute -left-6 top-1 h-3 w-3 rounded-full"
                  style={{ background: "var(--gold)", boxShadow: "0 0 0 5px var(--canvas)" }}
                />
                <div className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>
                  {j.year}
                </div>
                <h3 className="mt-2 text-xl" style={{ fontFamily: "var(--font-display)" }}>
                  {j.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]">{j.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 — Why Choose                                             */
/* ------------------------------------------------------------------ */
const WHY = [
  { Icon: Award, title: "Quality", desc: "Benchmarked against the highest standards in the industry at every touchpoint." },
  { Icon: Sparkles, title: "Experience", desc: "Three decades of trailblazing work in Kerala's construction landscape." },
  { Icon: Cpu, title: "Innovation", desc: "Structures ideated in-house and designed to be ahead of the times." },
  { Icon: HandshakeIcon, title: "Customer Commitment", desc: "We value every penny our clients invest in their dreams." },
  { Icon: Users, title: "Professional Team", desc: "An in-house team of professionals ideating, designing and building." },
  { Icon: ShieldCheck, title: "Long-term Trust", desc: "Signature buildings that stand — and speak for — the test of time." },
];

function WhyUs() {
  return (
    <section id="why" className="relative py-28 md:py-40" style={{ background: "var(--paper)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="gold-rule" />
                <span className="eyebrow">Why Chandy's</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.05]">
                Reasons our clients
                <br />
                <em style={{ color: "var(--gold)" }}>keep coming back.</em>
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl md:grid-cols-2 lg:grid-cols-3" style={{ background: "var(--line)" }}>
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <div
                className="group relative h-full p-8 transition-colors duration-500 hover:bg-[color:var(--ink)] md:p-10"
                style={{ background: "var(--paper)" }}
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-full transition-all duration-500 group-hover:bg-[color:var(--gold)]"
                  style={{ background: "var(--canvas)" }}
                >
                  <w.Icon className="h-5 w-5 transition-colors" />
                </span>
                <h3
                  className="mt-8 text-2xl leading-snug transition-colors duration-500 group-hover:text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {w.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-soft)] transition-colors duration-500 group-hover:text-white/75">
                  {w.desc}
                </p>
                <div
                  className="mt-8 h-px w-full transition-all duration-500 group-hover:bg-[color:var(--gold)]"
                  style={{ background: "var(--line)" }}
                />
                <div className="mt-4 text-[10px] tracking-[0.35em] uppercase text-[color:var(--ink-soft)] transition-colors duration-500 group-hover:text-white/60">
                  0{i + 1} / 06
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6 — Business Excellence                                    */
/* ------------------------------------------------------------------ */
function Excellence() {
  const stats = [
    { k: "Quality", v: "Highest industry standard" },
    { k: "Technology", v: "Modern methods & materials" },
    { k: "Team", v: "In-house professionals" },
    { k: "Innovation", v: "Ahead of the times" },
    { k: "Customers", v: "Long-term trust" },
  ];
  return (
    <section className="relative overflow-hidden py-28 md:py-40" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <img
        src={excellenceImg}
        alt="Modern glass architecture"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.75) 50%, rgba(17,17,17,0.95) 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="gold-rule" />
                <span className="eyebrow" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Business Excellence
                </span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-[clamp(2rem,4.6vw,4rem)] leading-[1.05] text-white">
                Excellence is not a moment.
                <br />
                <em style={{ color: "var(--gold)" }}>It is a discipline.</em>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-xl text-[15px] leading-[1.85] text-white/70">
                From the very moment of ideating the sketches to handing over the keys, we
                meticulously select the materials of the highest possible standard. The result
                is dream buildings that stand the test of time — blending the best of both
                traditional and modern construction techniques.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <div className="grid gap-px overflow-hidden rounded-2xl" style={{ background: "rgba(255,255,255,0.1)" }}>
              {stats.map((s, i) => (
                <Reveal key={s.k} delay={i * 90}>
                  <div
                    className="flex items-center justify-between px-6 py-6 md:px-8 md:py-7"
                    style={{ background: "rgba(17,17,17,0.9)" }}
                  >
                    <div className="flex items-center gap-6">
                      <span
                        className="text-[10px] tracking-[0.35em] uppercase"
                        style={{ color: "var(--gold)" }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className="text-2xl md:text-3xl"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {s.k}
                      </span>
                    </div>
                    <span className="text-right text-sm text-white/60 md:text-base">
                      {s.v}
                    </span>
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
    title: "Bricks, mortars & a touch of love.",
    body:
      "Chandy's Homes is where passion and professionalism take center stage. For us, a home holds a deep connection with its inhabitants — so we mix bricks and mortars with a touch of love to turn spaces into beautiful abodes.",
    img: homesImg,
  },
  {
    tag: "Hotels & Resorts",
    title: "Signature retreats. Windy Woods & Drizzle Drops.",
    body:
      "Our hospitality portfolio brings the same craftsmanship to leisure — quiet, elegant retreats where design, service and setting come together.",
    img: hotelsImg,
  },
  {
    tag: "Constructions",
    title: "Structures that are ahead of the times.",
    body:
      "Whether it is a soaring apartment or a community villa project, our buildings leave a signature that speaks for our excellence — engineered in-house from first sketch to final key.",
    img: constructionsImg,
  },
];

function Featured() {
  return (
    <section className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-16 max-w-3xl md:mb-24">
          <Reveal>
            <div className="mb-5 flex items-center gap-3">
              <span className="gold-rule" />
              <span className="eyebrow">Featured Highlights</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.05]">
              A closer look at
              <br />
              <em style={{ color: "var(--gold)" }}>what we do best.</em>
            </h2>
          </Reveal>
        </div>

        <div className="space-y-24 md:space-y-32">
          {FEATURES.map((f, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={f.tag}
                className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${reversed ? "" : ""}`}
              >
                <Reveal className={`lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}>
                  <div className="overflow-hidden rounded-3xl" style={{ boxShadow: "var(--shadow-card)" }}>
                    <img
                      src={f.img}
                      alt={f.title}
                      loading="lazy"
                      className="h-[380px] w-full object-cover transition-transform duration-[1600ms] hover:scale-[1.04] md:h-[560px]"
                    />
                  </div>
                </Reveal>
                <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
                  <Reveal delay={120}>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-[10px] tracking-[0.4em] uppercase"
                        style={{ color: "var(--gold)" }}
                      >
                        0{i + 1} · {f.tag}
                      </span>
                    </div>
                  </Reveal>
                  <Reveal delay={220}>
                    <h3
                      className="mt-6 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {f.title}
                    </h3>
                  </Reveal>
                  <Reveal delay={320}>
                    <p className="mt-6 text-[15px] leading-[1.85] text-[color:var(--ink-soft)]">
                      {f.body}
                    </p>
                  </Reveal>
                  <Reveal delay={420}>
                    <a href="#companies" className="mt-8 inline-flex items-center gap-3 text-sm font-medium">
                      Discover more
                      <span
                        className="grid h-9 w-9 place-items-center rounded-full"
                        style={{ background: "var(--ink)", color: "var(--paper)" }}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </a>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 8 — Values                                                 */
/* ------------------------------------------------------------------ */
function Values() {
  const values = ["Integrity", "Quality", "Commitment", "Trust", "Innovation"];
  return (
    <section className="relative py-28 md:py-40" style={{ background: "var(--paper)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="gold-rule" />
                <span className="eyebrow">Our Values</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.05]">
                What we
                <br />
                <em style={{ color: "var(--gold)" }}>strive for.</em>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-md text-[15px] leading-[1.85] text-[color:var(--ink-soft)]">
                Leaving a trail of excellence — a philosophy that guides every project,
                every partnership and every promise we make.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-8 md:grid-cols-2">
              <Reveal>
                <div className="rounded-3xl border p-8 md:p-10" style={{ borderColor: "var(--line)" }}>
                  <div className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>
                    Our Mission
                  </div>
                  <p
                    className="mt-5 text-2xl leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    To build structures that go beyond bricks and mortars — turning dreams
                    into signatures of excellence.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div
                  className="rounded-3xl p-8 md:p-10"
                  style={{ background: "var(--ink)", color: "var(--paper)" }}
                >
                  <div className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>
                    Our Vision
                  </div>
                  <p
                    className="mt-5 text-2xl leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    To ideate and build structures that are ahead of the times, blending
                    tradition with modern craft.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <div className="mt-8 rounded-3xl border p-8 md:p-10" style={{ borderColor: "var(--line)" }}>
                <div className="mb-6 text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>
                  Core Values
                </div>
                <div className="flex flex-wrap gap-x-10 gap-y-4">
                  {values.map((v, i) => (
                    <div key={v} className="flex items-baseline gap-3">
                      <span className="text-xs tracking-widest text-[color:var(--ink-soft)]">
                        0{i + 1}
                      </span>
                      <span
                        className="text-2xl md:text-3xl"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {v}
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
  return (
    <section id="contact" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14 max-w-4xl">
          <Reveal>
            <div className="mb-5 flex items-center gap-3">
              <span className="gold-rule" />
              <span className="eyebrow">Contact</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.02]">
              Let's Build the
              <br />
              <em style={{ color: "var(--gold)" }}>Future Together.</em>
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="space-y-8">
                {[
                  { Icon: MapPin, k: "Head Office", v: "Chandy's Group, Kerala, India" },
                  { Icon: Phone, k: "Phone", v: "+91 · Contact for details" },
                  { Icon: Mail, k: "Email", v: "info@chandys.co.in" },
                ].map((c) => (
                  <div key={c.k} className="flex gap-5 border-b pb-8" style={{ borderColor: "var(--line)" }}>
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full"
                      style={{ background: "var(--ink)", color: "var(--paper)" }}
                    >
                      <c.Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--ink-soft)]">
                        {c.k}
                      </div>
                      <div
                        className="mt-2 text-xl"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {c.v}
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  className="relative h-64 overflow-hidden rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--canvas), var(--paper)), radial-gradient(circle at 30% 30%, var(--gold) 0%, transparent 60%)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm shadow-md">
                      <MapPin className="h-4 w-4" style={{ color: "var(--gold)" }} />
                      <span style={{ fontFamily: "var(--font-display)" }}>
                        Kerala, India
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={150}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="rounded-3xl p-8 md:p-12"
                style={{ background: "var(--paper)", border: "1px solid var(--line)", boxShadow: "var(--shadow-card)" }}
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Full Name" placeholder="Your name" />
                  <Field label="Email" placeholder="you@company.com" type="email" />
                  <Field label="Phone" placeholder="+91" />
                  <Field label="Company" placeholder="Optional" />
                </div>
                <div className="mt-6">
                  <label className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--ink-soft)]">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project…"
                    className="mt-3 w-full resize-none rounded-2xl border bg-transparent px-5 py-4 text-[15px] outline-none transition-colors focus:border-[color:var(--ink)]"
                    style={{ borderColor: "var(--line)" }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-ink mt-8 w-full md:w-auto"
                >
                  Send Enquiry
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </Reveal>
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
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--ink-soft)]">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-3 w-full rounded-full border bg-transparent px-5 py-3 text-[15px] outline-none transition-colors focus:border-[color:var(--ink)]"
        style={{ borderColor: "var(--line)" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 10 — Footer                                                */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span
                className="grid h-10 w-10 place-items-center rounded-full text-sm"
                style={{ background: "var(--gold)", color: "var(--ink)", fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                C
              </span>
              <div className="leading-none">
                <div className="text-xl" style={{ fontFamily: "var(--font-display)" }}>
                  Chandy's
                </div>
                <div className="mt-1 text-[9px] tracking-[0.35em] opacity-70">GROUP</div>
              </div>
            </div>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-white/60">
              A diversified business group delivering excellence across construction, homes,
              hotels & resorts and hospitality since 1994.
            </p>
          </div>
          <FooterCol
            title="Our Companies"
            items={[
              "Chandy's Constructions",
              "Chandy's Homes",
              "Chandy's Hotels & Resorts",
              "Chandy's Builders",
              "Restaurant Ente Amma",
            ]}
          />
          <FooterCol title="Explore" items={["Home", "About", "Journey", "Why Us", "Contact"]} />
          <FooterCol title="Follow" items={["LinkedIn", "Instagram", "Facebook", "YouTube"]} />
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t pt-8 text-xs text-white/50 md:flex-row md:items-center" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
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

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="lg:col-span-2">
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
      <Journey />
      <WhyUs />
      <Excellence />
      <Featured />
      <Values />
      <Contact />
      <Footer />
    </main>
  );
}
