import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogoSignal } from "./components/LogoSignal";
import {
  links,
  principles,
  profile,
  projects,
  stack,
  type sectionName,
} from "./data/siteContent";
import "./App.css";
import { usePostHog } from "@posthog/react";
import useTheme from "./CustomHooks/useTheme";

// svg
import {
  ArrowUpRight,
  Code2,
  Contact,
  Mail,
  FileUser,
  Sun,
  Moon,
} from "lucide-react";
import Logo from "./assets/logoV1.svg?react";
import InstagramLogo from "./assets/socials/instagram.svg?react";
import FacebookLogo from "./assets/socials/facebook.svg?react";
import XLogo from "./assets/socials/x-twitter.svg?react";
import WpLogo from "./assets/socials/whatsapp.svg?react";

gsap.registerPlugin(ScrollTrigger);

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

const iconMap = {
  GitHub: Code2,
  LinkedIn: Contact,
  Email: Mail,
};

function App() {
  const { theme, toggleTheme } = useTheme();
  const posthog = usePostHog();
  const reducedMotion = useReducedMotion();

  const year = useMemo(() => new Date().getFullYear(), []);
  const pageRef = useRef<HTMLDivElement>(null);
  const linksSection = useRef<HTMLElement | null>(null);
  const aboutSection = useRef<HTMLElement | null>(null);
  const projectsSection = useRef<HTMLElement | null>(null);

  function scrollToSection(section: sectionName) {
    switch (section) {
      case "links":
        linksSection.current?.scrollIntoView();
        break;
      case "about":
        aboutSection.current?.scrollIntoView();
        break;
      case "projects":
        projectsSection.current?.scrollIntoView();
        break;

      default:
        break;
    }
  }
  function postHogCap(label: string, config: object) {
    posthog.capture(label, config);
  }

  useEffect(() => {
    posthog._init(import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN ?? "", {
      api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
      capture_pageview: true,
    });
    if (reducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", {
        y: 22,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.35,
      });

      gsap.from(".signal-panel", {
        y: 18,
        opacity: 0,
        duration: 1,
        delay: 0.18,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
        gsap.from(item, {
          y: 26,
          opacity: 0,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            once: true,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <main ref={pageRef} className="site-shell">
      <nav className="topbar" aria-label="Primary navigation">
        <a
          className="brand-lockup"
          aria-label="osazeh home"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <Logo />
          <span>{window.innerWidth > 540 ? profile.name : "Osazeh"}</span>
        </a>
        <div className="nav-links">
          <a onClick={() => scrollToSection("links")}>Link</a>
          <a onClick={() => scrollToSection("about")}>Chi sono</a>
          <a onClick={() => scrollToSection("projects")}>Progetti</a>
        </div>
        <div className="nav-actions">
          <a className="nav-cta" href="mailto:zabolichristian@gmail.com">
            Lavoriamo insieme <ArrowUpRight size={14} />
          </a>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            aria-pressed={theme === "dark"}
          >
            {theme === "light" ? (
              <Moon strokeWidth={1.2} color="#8a52ff" />
            ) : (
              <Sun strokeWidth={1.5} color="#f5d200" />
            )}
          </button>
        </div>
      </nav>

      <section className="hero section-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span></span>
            {profile.role}
          </p>
          <h1>Costruisco sistemi veloci e scalabili.</h1>
          {/* <h1>I build fast, scalable systems.</h1> */}
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions" aria-label="Primary links">
            <a
              className="button button-primary"
              onClick={() => scrollToSection("projects")}
            >
              Vedi i progetti <ArrowUpRight size={16} />
            </a>
            <a
              className="button button-ghost"
              onClick={() => scrollToSection("about")}
            >
              Chi sono <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <aside className="signal-panel" aria-label="Animated brand signal">
          <div className="panel-header">
            <span>Focus attuale</span>
            <strong>Frontend</strong>
          </div>
          <div className="signal-stage">
            <LogoSignal reducedMotion={reducedMotion} />
          </div>
          <div className="signal-meta">
            <span>Sistemi UI</span>
            <span>Product polish</span>
            <span>Motion details</span>
          </div>
        </aside>
      </section>

      <section ref={linksSection} className="links-band" data-reveal>
        <div className="section-label">
          <span></span> Link utili
        </div>
        <div className="links-grid">
          {links.map((link) => {
            const Icon =
              iconMap[link.label as keyof typeof iconMap] ?? FileUser;
            return (
              <a
                className="link-card"
                href={link.href}
                key={link.label}
                target={
                  link.href.startsWith("http") || link.href.startsWith("/")
                    ? "_blank"
                    : undefined
                }
                rel="noreferrer"
                onClick={() =>
                  postHogCap("Links Section Click", {
                    label: link.label,
                    href: link.href,
                    section: "links",
                  })
                }
              >
                <Icon size={20} />
                <span>{link.label}</span>
                <small>{link.note}</small>
                <ArrowUpRight className="card-arrow" size={17} />
              </a>
            );
          })}
        </div>
      </section>

      <section
        ref={aboutSection}
        className="about-layout section-grid"
        data-reveal
      >
        <div>
          <div className="section-label">
            <span></span> Chi sono
          </div>
          <h2>Frontend guidato dal design e costruito con cura.</h2>
        </div>
        <div className="about-copy">
          <p>{profile.about}</p>
          <p>{profile.availability}</p>
          <div className="principles">
            {principles.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section ref={projectsSection} className="projects-section" data-reveal>
        <div className="section-heading">
          <div>
            <div className="section-label">
              <span></span> Lavori selezionati
            </div>
            <h2>Alcuni progetti ed esperimenti recenti.</h2>
          </div>
          <a
            href="https://github.com/christianzaboli"
            target="_blank"
            rel="noreferrer"
          >
            Vai a GitHub <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  postHogCap("Project Click", {
                    title: project.title,
                    href: project.link,
                    section: "projects",
                  })
                }
              >
                <div className="project-preview" aria-hidden="true">
                  <span>0{index + 1}</span>
                  <div className="preview-line"></div>
                  <img
                    src={project.image}
                    alt={project.title.split(" ").join("_") + "_image"}
                  />
                </div>
              </a>
              <div className="project-body">
                <div className="project-kicker">
                  <span>{project.type}</span>
                  <span>{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="tags">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stack-section" data-reveal>
        <div className="stack-panel">
          <div className="section-label">
            <span></span> Stack / interessi
          </div>
          <div className="stack-grid">
            {stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="callout-panel">
          <Logo />
          <p>
            Stai cercando qualcuno che costruisca l&apos;interfaccia, curi i
            dettagli e mantenga il sistema solido nel tempo?
          </p>
          <div>
            <a
              href="https://discord.com/users/osazeh"
              target="_blank"
              style={{ margin: "0 20px 20px 0" }}
              onClick={() =>
                postHogCap("Personal Discord", {
                  title: "discord link",
                  href: "https://discord.com/users/osazeh",
                })
              }
            >
              Parliamo su Discord!
              <ArrowUpRight size={16} />
            </a>
            <a href="mailto:zabolichristian@gmail.com">
              oppure per email...
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-copy">
          <span>Costruito con intenzione</span>
          <span className="slash-divider">/</span>
          <span>Rifinito con cura</span>
          <span className="slash-divider">/</span>
          <span>
            {profile.location.map((location) => (
              <span key={location}> {location}</span>
            ))}
            .
          </span>
        </div>
        <div className="footer-meta">
          <div className="footer-socials" aria-label="Social links">
            <a href="https://www.instagram.com/osazeh/" target="_blank">
              <InstagramLogo />
            </a>
            <a href="https://www.facebook.com/Osxze" target="_blank">
              <FacebookLogo />
            </a>
            <a
              href="https://wa.me/393200378831?text=Ciao!%20Ho%20visto%20il%20tuo%20sito%20%F0%9F%91%8B%0ATi%20contatto%20per%3A%20[sito%20web%20%2F%20collaborazione%20%2F%20info]"
              target="_blank"
              aria-label="Chat on WhatsApp"
            >
              <WpLogo />
            </a>
            <a href="https://x.com/osazxh" target="_blank">
              <XLogo />
            </a>
          </div>
          <strong>/{year}</strong>
        </div>
      </footer>
    </main>
  );
}

export default App;
