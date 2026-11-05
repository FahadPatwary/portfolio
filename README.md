# fahadpatwary.com

Next.js (App Router, static export) + TypeScript + Tailwind CSS v4, content in MDX. Deployed on Cloudflare Pages.

## Develop
    npm run dev      # http://localhost:3000
    npm run build    # static site in ./out

## Deploy (Cloudflare Pages)
- Build command: `npm run build`
- Build output directory: `out`
- Environment: `NODE_VERSION=22`, optional `NEXT_PUBLIC_CF_BEACON_TOKEN` (Cloudflare Web Analytics token)
- Custom domain: add `fahadpatwary.com` under the Pages project > Custom domains.

## Content
- `content/projects/*.mdx`, `content/research/*.mdx` (one file per page; frontmatter drives the cards)
- Search the repo for `TODO` to find the facts still to fill in.
- Put the CV at `public/Fahad_Ahmed_Patwary_CV.pdf`, paper PDFs in `public/papers/`, screenshots in `public/screenshots/`.
