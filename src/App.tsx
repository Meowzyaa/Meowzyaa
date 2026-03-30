import type { ReactElement } from "react";

type ProfileLink = {
  readonly label: string;
  readonly href: string;
  readonly external: boolean;
};

type SkillItem = {
  readonly title: string;
  readonly detail: string;
};

type TimelineItem = {
  readonly period: string;
  readonly role: string;
  readonly description: string;
};

const PROFILE_LINKS: readonly ProfileLink[] = [
  { label: "GitHub", href: "https://github.com/Meowzyaa", external: true },
  { label: "Artist", href: "https://artists.landr.com/Meowzya", external: true },
  { label: "Email", href: "mailto:meowzya@proton.me", external: false }
];

const SKILLS: readonly SkillItem[] = [
  { title: "Tutoring", detail: "Chemistry, Physics, Mathematics" },
  { title: "Composing", detail: "Post-rock" },
  { title: "Machine learning", detail: "In progress" }
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

export default function App(): ReactElement {
  return (
    <div className="site-shell">
      <div className="ambient" aria-hidden="true">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
      </div>

      <main className="layout" aria-label="Portfolio layout">
        <header className="card brand-card reveal-1">
          <p className="eyebrow">meowzyaa.dev</p>
          <h1 className="display-name">Shaimardan Azamat</h1>
          <p className="display-role">Developer</p>
          <p className="lead-copy">
            Building polished web products with strong engineering discipline, clean interaction design, and
            production-ready code.
          </p>
        </header>

        <section className="card timeline-card reveal-2" aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="section-title">
            Experience
          </h2>
          <ul className="timeline-list">
            {TIMELINE.map((item: TimelineItem) => (
              <li className="timeline-item" key={item.period}>
                <p className="timeline-period">{item.period}</p>
                <p className="timeline-role">{item.role}</p>
                <p className="timeline-description">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="card skills-card reveal-3" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="section-title">
            Skills
          </h2>
          <ul className="skills-list">
            {SKILLS.map((skill: SkillItem) => (
              <li className="skills-item" key={skill.title}>
                <span className="skills-title">{skill.title}</span>
                <span className="skills-detail">{skill.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        <aside className="card links-card reveal-4" aria-labelledby="links-heading">
          <h2 id="links-heading" className="section-title">
            Links
          </h2>
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
        </aside>
      </main>
    </div>
  );
}
