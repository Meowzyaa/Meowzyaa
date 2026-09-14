import type { ReactElement } from "react";

type Release = {
  readonly no: string;
  readonly title: string;
  readonly note: string;
  readonly format: string;
  readonly action: { readonly label: string; readonly href: string };
};

type Side = {
  readonly id: string;
  readonly side: string;
  readonly name: string;
  readonly releases: readonly Release[];
};

type Contact = {
  readonly via: string;
  readonly handle: string;
  readonly href?: string;
};

// Every line here should be checkable against a repo, a commit or a live URL.
const SIDES: readonly Side[] = [
  {
    id: "work",
    side: "Side A",
    name: "Software",
    releases: [
      {
        no: "A1",
        title: "chemprep",
        note: "Revision site for the NIS grade 12 chemistry exam. Every question from the 2014 to 2025 past papers, sorted by syllabus topic and marked against the official keys where they exist.",
        format: "JavaScript, Perl",
        action: { label: "Open", href: "https://meowzyaa.dev/chemprep/" }
      },
      {
        no: "A2",
        title: "NovaNIS",
        note: "My fork of enis2, an open-source client for the NIS electronic diary: grades and the report card in a web app built for phones, with a Fastify proxy because NIS has no public API.",
        format: "Vue, Vite, Fastify",
        action: { label: "Source", href: "https://github.com/Meowzyaa/enis2" }
      },
      {
        no: "A3",
        title: "meowzyaa.dev",
        note: "This site. Built with Vite and deployed to GitHub Pages on every push.",
        format: "React, TypeScript",
        action: { label: "Source", href: "https://github.com/Meowzyaa/Meowzyaa" }
      }
    ]
  },
  {
    id: "music",
    side: "Side B",
    name: "Music",
    releases: [
      {
        no: "B1",
        title: "Meowzya",
        note: "Game soundtrack arrangements, produced in FL Studio and published with their own music videos.",
        format: "YouTube",
        action: { label: "Watch", href: "https://www.youtube.com/@meowzyatheone" }
      }
    ]
  }
];

const CONTACTS: readonly Contact[] = [
  { via: "Mail", handle: "meowzya@proton.me", href: "mailto:meowzya@proton.me" },
  { via: "Telegram", handle: "@roarinx", href: "https://t.me/roarinx" },
  { via: "YouTube", handle: "@meowzyatheone", href: "https://www.youtube.com/@meowzyatheone" },
  { via: "GitHub", handle: "Meowzyaa", href: "https://github.com/Meowzyaa" },
  { via: "Based in", handle: "Almaty, Kazakhstan" }
];

const CATALOGUE = "MZY-2026";

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Music", href: "#music" },
  { label: "Contact", href: "#contact" }
];

function Arrow(): ReactElement {
  return (
    <svg className="arrow" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M2.5 7.5 7.5 2.5M3.5 2.5h4v4" />
    </svg>
  );
}

function External({ href, children }: { readonly href: string; readonly children: ReactElement | string }): ReactElement {
  const outside = href.startsWith("http");
  return (
    <a href={href} target={outside ? "_blank" : undefined} rel={outside ? "noopener noreferrer" : undefined}>
      {children}
    </a>
  );
}

function Disc({ className }: { readonly className: string }): ReactElement {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <circle className="disc-face" cx="16" cy="16" r="15" />
      <circle className="disc-groove" cx="16" cy="16" r="10" />
      <circle className="disc-hole" cx="16" cy="16" r="2.5" />
    </svg>
  );
}

// The one illustration: a centre label, the part of a record that carries the name.
function CentreLabel(): ReactElement {
  return (
    <svg className="label" viewBox="0 0 240 240" role="img" aria-label="Record label reading Meowzyaa, Shaimardan Azamat, Almaty">
      <defs>
        <path id="rim" d="M 120 120 m -86 0 a 86 86 0 1 1 172 0 a 86 86 0 1 1 -172 0" />
      </defs>
      <circle className="label-disc" cx="120" cy="120" r="116" />
      <circle className="label-ring" cx="120" cy="120" r="100" />
      <circle className="label-ring" cx="120" cy="120" r="72" />
      <text className="label-rim">
        <textPath href="#rim" textLength="532" lengthAdjust="spacing">
          MEOWZYAA · SHAIMARDAN AZAMAT · ALMATY · 2026 ·
        </textPath>
      </text>
      <text className="label-side" x="120" y="104" textAnchor="middle">
        SIDE B
      </text>
      <text className="label-cat" x="120" y="152" textAnchor="middle">
        {CATALOGUE}
      </text>
      <circle className="label-hole" cx="120" cy="120" r="7" />
    </svg>
  );
}

function Tracklist({ side }: { readonly side: Side }): ReactElement {
  return (
    <section className="release" id={side.id} aria-labelledby={`${side.id}-title`}>
      <div className="release-head">
        <p className="release-side">{side.side}</p>
        <h2 id={`${side.id}-title`} className="release-title">
          {side.name}
          <span className="release-count">({String(side.releases.length).padStart(2, "0")})</span>
        </h2>
      </div>

      <table className="tracklist">
        <thead>
          <tr>
            <th scope="col" className="col-no">#</th>
            <th scope="col">Title</th>
            <th scope="col" className="col-format">Format</th>
            <th scope="col" className="col-action">
              <span className="visually-hidden">Link</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {side.releases.map((release) => (
            <tr key={release.no}>
              <td className="col-no">{release.no}</td>
              <td className="col-title">
                <span className="track-title">{release.title}</span>
                <span className="track-note">{release.note}</span>
              </td>
              <td className="col-format">{release.format}</td>
              <td className="col-action">
                <External href={release.action.href}>
                  <>
                    {release.action.label}
                    <Arrow />
                  </>
                </External>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default function App(): ReactElement {
  const [sideA, sideB] = SIDES;

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <a className="nav-mark" href="#top" aria-label="Meowzyaa, back to top">
            <Disc className="nav-disc" />
            <span>Meowzyaa</span>
          </a>
          <nav aria-label="Sections">
            <ul className="nav-links">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <div className="sleeve" id="top">
        <section className="cover" aria-labelledby="name">
          <div className="cover-main">
            <dl className="release-data">
              <div>
                <dt>Cat. no.</dt>
                <dd>{CATALOGUE}</dd>
              </div>
              <div>
                <dt>Updated</dt>
                <dd>{__BUILD_DATE__}</dd>
              </div>
            </dl>
            <h1 id="name" className="title">
              <span>Shaimardan</span>
              <span>Azamat</span>
            </h1>
          </div>
          <p className="liner">
            Student at NIS Almaty. I build web apps, tutor, and arrange music as <em>Meowzya</em>. This is the tracklist so far.
          </p>
        </section>

        <main>
          <Tracklist side={sideA} />
          <div className="side-b">
            <Tracklist side={sideB} />
            <CentreLabel />
          </div>
        </main>

        <section className="release" id="contact" aria-labelledby="contact-title">
          <div className="release-head">
            <p className="release-side">Credits</p>
            <h2 id="contact-title" className="release-title">
              Contact
            </h2>
          </div>
          <dl className="credits">
            {CONTACTS.map((contact) => (
              <div className="credit" key={contact.via}>
                <dt>{contact.via}</dt>
                <dd>{contact.href ? <External href={contact.href}>{contact.handle}</External> : contact.handle}</dd>
              </div>
            ))}
          </dl>
        </section>

        <footer className="imprint">
          <span>&copy; {new Date().getFullYear()} Meowzyaa</span>
          <span>{CATALOGUE}</span>
        </footer>
      </div>
    </>
  );
}
