# uiUx-portfolio

// ...existing code...

# Jagriti Sood — Static Portfolio

A small static portfolio site built with plain HTML, Tailwind CSS (CDN), and a few lightweight scripts for animations and UX touches. Designed as a multi-page portfolio featuring case studies, a resume preview, and a gallery of handcrafted work.

## Quick start

- Open [index.html](index.html) in your browser to view the site locally.
- No build step required — files are static and use CDN-hosted dependencies (Tailwind, AOS).

## Project structure

- [index.html](index.html) — Home / landing page
- [work.html](work.html) — Portfolio overview and case links
- [about.html](about.html) — About / story / skills
- [resume.html](resume.html) — Resume download and preview
- [beyond-uiux.html](beyond-uiux.html) — Handcrafted collection / gallery
- [contact.html](contact.html) — Contact / social links
- [case-101healthcare.html](case-101healthcare.html), [case-maplecode.html](case-maplecode.html), [case-campaign.html](case-campaign.html) — Case study pages

Assets and scripts:

- [assets/js/script.js](assets/js/script.js) — small script (handles `btn` and runs [`AOS.init`](assets/js/script.js)) and contains the [`btn`](assets/js/script.js) variable handler
- [assets/files/images/](assets/files/images/) — image assets used across pages
- [assets/files/Jagriti-Sood-Resume.pdf](assets/files/Jagriti-Sood-Resume.pdf) — resume file
- [package.json](package.json) — project metadata
- [.github/workflows/static.yml](.github/workflows/static.yml) — GitHub Pages deployment workflow

## Deployment

This repo includes a GitHub Actions workflow to deploy the repository to GitHub Pages: [.github/workflows/static.yml](.github/workflows/static.yml). The workflow uploads the repo contents and deploys to Pages on pushes to `main`.

## Notes & troubleshooting

- Image paths: assets live under `assets/files/images/`, but some pages reference `./assets/images/...`. If images do not appear, either:
  - Move or symlink `assets/files/images/` to `assets/images/`, or
  - Update the HTML to reference `./assets/files/images/...` (check [index.html](index.html), [work.html](work.html), [about.html](about.html), [beyond-uiux.html](beyond-uiux.html), etc.).

- Shared JS: [`assets/js/script.js`](assets/js/script.js) initializes AOS and binds a click handler to the `btn` element. Ensure pages with the contact button include the script or centralize the include in a common template. See the `btn` variable in [`assets/js/script.js`](assets/js/script.js).

- AOS initialization appears in multiple pages and in [`assets/js/script.js`](assets/js/script.js). Consolidate to avoid duplicate initialization.

## Contributing

This is a simple static site. For small fixes (paths, typos, assets), update the files directly and test in a browser. For larger changes, open a PR describing the change.

## License

Use as you see fit. Add a license file if needed.
