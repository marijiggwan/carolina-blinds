# Carolina Blinds Website

Custom window treatment company serving Western North Carolina since 1992.

**Live site:** [carolinablinds.com](https://www.carolinablinds.com)

## Stack
- Static HTML/CSS
- Deployed via Netlify (auto-deploy on push to `main`)
- No CMS, no build step

## Structure
```
/
├── css/styles.css          # Shared stylesheet
├── index.html              # Homepage
├── products/               # Product pages
│   ├── index.html          # Products hub
│   ├── blinds.html
│   ├── shades.html
│   ├── shutters.html
│   └── motorization.html
├── services/               # Service pages
│   ├── repair.html
│   └── blind-restringing.html
├── areas/                  # Service area landing pages
│   ├── hendersonville.html
│   ├── asheville.html
│   ├── weaverville.html
│   └── black-mountain.html
├── about.html
├── contact.html
├── reviews.html
├── faq.html
├── blog.html
├── get-quote.html          # LSA landing page
├── thank-you.html
├── privacy.html
├── _redirects              # Netlify redirect rules
├── netlify.toml            # Netlify config
├── robots.txt
└── sitemap.xml
```

## Deployment
Push to `main` branch → Netlify auto-deploys.

## Managed by
Mari Peterson | Marketing Consultant
