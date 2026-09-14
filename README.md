# Shaimardan Azamat

Student at NIS Almaty. I build web apps, tutor, and make music as Meowzya.

- **[chemprep](https://meowzyaa.dev/chemprep/)**: revision site for the NIS grade 12 chemistry exam, built from the 2014 to 2025 past papers
- **[NovaNIS](https://github.com/Meowzyaa/enis2)**: my fork of enis2, a client for the NIS electronic diary (Vue, Vite, Fastify)
- **[meowzyaa.dev](https://meowzyaa.dev)**: my site, and the source for it is this repo (React, TypeScript, Vite)
- **[Meowzya on YouTube](https://www.youtube.com/@meowzyatheone)**: game soundtrack arrangements

Reach me at meowzya@proton.me or on [Telegram](https://t.me/roarinx).

## This repo

The site is a single React page built with Vite and deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`. chemprep is a separate static
site that lives in `public/chemprep/`, so Vite copies it to `/chemprep/` untouched.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # type-check, then build to dist/
```
