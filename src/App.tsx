import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactElement } from "react";

type ProfileLink = {
  readonly label: string;
  readonly href: string;
  readonly external: boolean;
};

type SkillGroup = {
  readonly title: string;
  readonly tags: readonly string[];
};

type TimelineItem = {
  readonly period: string;
  readonly role: string;
  readonly description: string;
};

type Project = {
  readonly name: string;
  readonly tech: string;
  readonly description: string;
  readonly href: string;
};

const PROFILE_LINKS: readonly ProfileLink[] = [
  { label: "GitHub", href: "https://github.com/Meowzyaa", external: true },
  { label: "Artist", href: "https://artists.landr.com/Meowzya", external: true },
  { label: "Email", href: "mailto:meowzya@proton.me", external: false }
];

const SKILL_GROUPS: readonly SkillGroup[] = [
  { title: "Engineering", tags: ["TypeScript", "React", "Vite", "CSS"] },
  { title: "Data", tags: ["Cleaning", "Formatting", "Converting"] },
  { title: "Tutoring", tags: ["Chemistry", "Physics", "Mathematics"] },
  { title: "Music", tags: ["Composing", "Post-rock"] },
  { title: "Learning", tags: ["Machine learning"] }
];

const TIMELINE: readonly TimelineItem[] = [
  {
    period: "Now",
    role: "NIS Almaty · 11th Grade",
    description: "Building software and growing a strong STEM foundation with a focus on practical projects."
  },
  {
    period: "Current Focus",
    role: "Developer",
    description: "Crafting fast interfaces, improving visual quality, and shipping work with production standards."
  }
];

const PROJECTS: readonly Project[] = [
  {
    name: "meowzyaa.dev",
    tech: "React · TypeScript · Vite",
    description: "This site — a hand-built portfolio with zero UI libraries, animated with plain CSS.",
    href: "https://github.com/Meowzyaa/Meowzyaa"
  },
  {
    name: "enis2",
    tech: "Vue",
    description: "Contributing to enis resurrection 2 — an open-source revival of a school gradebook client.",
    href: "https://github.com/Meowzyaa/enis2"
  },
  {
    name: "Meowzya (music)",
    tech: "Post-rock",
    description: "Original compositions, written and produced solo, distributed via LANDR.",
    href: "https://artists.landr.com/Meowzya"
  }
];

/* --- Minecraft-style world --- */

const GRID = 9;
const BLOCK = 48;

type SectionKey = "experience" | "skills" | "projects" | "links";

type Landmark = {
  readonly x: number;
  readonly y: number;
  readonly key: SectionKey;
  readonly icon: string;
  readonly label: string;
};

const LANDMARKS: readonly Landmark[] = [
  { x: 2, y: 2, key: "experience", icon: "🎓", label: "Experience" },
  { x: 6, y: 2, key: "skills", icon: "🛠️", label: "Skills" },
  { x: 2, y: 6, key: "projects", icon: "📦", label: "Projects" },
  { x: 6, y: 6, key: "links", icon: "✉️", label: "Links" }
];

type Block = {
  readonly x: number;
  readonly y: number;
  readonly h: number;
  readonly kind: "grass" | "stone" | "water";
  readonly landmark?: Landmark;
};

// ponytail: deterministic sine-wave heightmap, swap for real noise if the terrain ever needs to grow
const TERRAIN: readonly Block[] = (() => {
  const blocks: Block[] = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const landmark = LANDMARKS.find((l) => l.x === x && l.y === y);
      if (landmark) {
        blocks.push({ x, y, h: 34, kind: "grass", landmark });
        continue;
      }
      const wave = Math.sin(x * 1.3 + 0.8) + Math.cos(y * 1.1 + 1.9) + Math.sin((x + y) * 0.6);
      if (wave < -1.15) {
        blocks.push({ x, y, h: 8, kind: "water" });
        continue;
      }
      blocks.push({
        x,
        y,
        h: Math.round(16 + (wave + 1.15) * 7),
        kind: wave > 1.7 ? "stone" : "grass"
      });
    }
  }
  return blocks;
})();

const PANEL_TITLES: Record<SectionKey, string> = {
  experience: "Experience",
  skills: "Skills",
  projects: "Projects",
  links: "Links"
};

function PanelContent({ section }: { readonly section: SectionKey }): ReactElement {
  if (section === "experience") {
    return (
      <ul className="timeline-list">
        {TIMELINE.map((item: TimelineItem) => (
          <li className="timeline-item" key={item.period}>
            <p className="timeline-period">{item.period}</p>
            <p className="timeline-role">{item.role}</p>
            <p className="timeline-description">{item.description}</p>
          </li>
        ))}
      </ul>
    );
  }
  if (section === "skills") {
    return (
      <ul className="skills-list">
        {SKILL_GROUPS.map((group: SkillGroup) => (
          <li className="skills-item" key={group.title}>
            <span className="skills-title">{group.title}</span>
            <span className="tag-row">
              {group.tags.map((tag: string) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  if (section === "projects") {
    return (
      <ul className="projects-list">
        {PROJECTS.map((project: Project) => (
          <li key={project.name}>
            <a className="project-item" href={project.href} target="_blank" rel="noopener noreferrer">
              <span className="project-head">
                <span className="project-name">{project.name}</span>
                <span className="project-tech">{project.tech}</span>
              </span>
              <span className="project-description">{project.description}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <nav aria-label="Profile links">
      <ul className="links-list">
        {PROFILE_LINKS.map((link: ProfileLink) => (
          <li key={link.label}>
            <a
              className="text-link"
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const PANEL_WIDTH = 460; // panel + right margin, used to center the zoom target in the free space

export default function App(): ReactElement {
  const [selected, setSelected] = useState<SectionKey | null>(null);
  const [zoom, setZoom] = useState<CSSProperties | undefined>(undefined);
  const worldRef = useRef<HTMLDivElement | null>(null);

  const close = (): void => {
    setSelected(null);
    setZoom((prev) => (prev ? { ...prev, transform: "translate(0px, 0px) scale(1)" } : prev));
  };

  const openSection = (key: SectionKey, target: HTMLElement): void => {
    const world = worldRef.current;
    if (world) {
      const blockRect = target.getBoundingClientRect();
      const worldRect = world.getBoundingClientRect();
      const cx = blockRect.left + blockRect.width / 2;
      const cy = blockRect.top + blockRect.height / 2;
      const mobile = window.matchMedia("(max-width: 640px)").matches;
      const scale = mobile ? 1.8 : 2.2;
      const anchorX = mobile || window.innerWidth < PANEL_WIDTH * 2 ? window.innerWidth / 2 : (window.innerWidth - PANEL_WIDTH) / 2;
      const anchorY = mobile ? window.innerHeight * 0.3 : window.innerHeight / 2;
      setZoom({
        transform: `translate(${anchorX - cx}px, ${anchorY - cy}px) scale(${scale})`,
        transformOrigin: `${cx - worldRect.left}px ${cy - worldRect.top}px`
      });
    }
    setSelected(key);
  };

  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div className="site-shell">
      <div className="ambient" aria-hidden="true">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
      </div>

      <main className="layout" aria-label="Portfolio layout">
        <header className="hero reveal-1">
          <p className="eyebrow">meowzyaa.dev</p>
          <h1 className="display-name">
            Shaimardan <span className="accent-text">Azamat</span>
          </h1>
          <p className="display-role">Developer · Tutor · Composer · Almaty</p>
        </header>

        <section className="world-section reveal-2" aria-label="Interactive world">
          <div className={`world${selected !== null ? " zoomed" : ""}`} ref={worldRef} style={zoom}>
            <div className="scene">
              {TERRAIN.map((block: Block) => {
                const style = {
                  left: block.x * BLOCK,
                  top: block.y * BLOCK,
                  "--h": `${block.h}px`
                } as CSSProperties;
                const faces = (
                  <>
                    <span className="face face-top" />
                    <span className="face face-south" />
                    <span className="face face-east" />
                  </>
                );
                if (block.landmark) {
                  return (
                    <button
                      type="button"
                      key={`${block.x}-${block.y}`}
                      className={`block ${block.kind} landmark`}
                      style={style}
                      aria-label={`Open ${block.landmark.label}`}
                      onClick={(event) => openSection(block.landmark!.key, event.currentTarget)}
                    >
                      {faces}
                      <span className="beacon">
                        <span className="beacon-icon">{block.landmark.icon}</span>
                        <span className="beacon-label">{block.landmark.label}</span>
                      </span>
                    </button>
                  );
                }
                return (
                  <div key={`${block.x}-${block.y}`} className={`block ${block.kind}`} style={style}>
                    {faces}
                  </div>
                );
              })}
            </div>
          </div>
          <p className="world-hint">Tap a marker to explore</p>
        </section>

        <footer className="quick-links reveal-3">
          {PROFILE_LINKS.map((link: ProfileLink) => (
            <a
              className="text-link"
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </footer>
      </main>

      {selected !== null && (
        <>
          <div className="backdrop" onClick={close} aria-hidden="true" />
          <section className="card panel" role="dialog" aria-modal="true" aria-label={PANEL_TITLES[selected]}>
            <div className="panel-head">
              <h2 className="section-title panel-title">{PANEL_TITLES[selected]}</h2>
              <button type="button" className="panel-close" onClick={close} aria-label="Close panel">
                ✕
              </button>
            </div>
            <PanelContent section={selected} />
          </section>
        </>
      )}
    </div>
  );
}
