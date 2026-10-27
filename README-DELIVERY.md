# Shaikh Sons Lift Engineering — QA and Repair Delivery

## Included pages
- `index.html` — homepage, equipment catalogue and WhatsApp quotation form
- `lifts.html` — semi-hydraulic lift
- `Aircompressor.html` — air compressor range
- `Carwashpump.html` — BJ-70 car wash pump
- `shampomachine.html` — 50L shampoo machine
- `hydraulic-oil.html` — listed 150L hydraulic oil
- `Servicestationsetup.html` — service-station setup
- `style.css` — responsive and accessibility refinements
- `script.js` — catalogue filtering, equipment selection and quote-message builder
- `sitemap.xml`, `robots.txt`

## Repairs made
- Reworked catalogue filters to use consistent filtering and accessible pressed states.
- Made the catalogue search field functional for model names, categories and equipment text.
- Hardened product selection actions so missing form controls do not throw errors.
- Improved quotation form validation, message formatting and WhatsApp fallback if a new tab is blocked.
- Normalized the header WhatsApp label to match the linked 0321 number; preserved the separately listed 0315 contact where it is presented as an alternate phone number.
- Added `noopener noreferrer` to links opening new tabs.
- Added autocomplete/input semantics to contact fields.
- Improved keyboard focus visibility, reduced-motion support, mobile form sizing, anchor scroll offsets and mobile overflow behavior while preserving the existing palette and utility-class design.
- Kept the existing SEO titles, descriptions, canonical URLs, Open Graph metadata, sitemap and robots file intact.

## Automated checks performed
- `node --check script.js` passed.
- Local HTML references and same-page fragment links checked across all seven HTML pages.
- Duplicate IDs checked per page.
- Image alt text and explicit width/height attributes checked.
- No issues were found by those static checks.

## Important launch checks still required
This archive can be statically checked, but a full production sign-off requires opening it in a real browser and testing at phone/tablet/desktop widths, testing the actual WhatsApp account, and checking external image/font/CDN availability. No real WhatsApp message was sent as part of these checks.

The site still loads Tailwind through its CDN and fonts/images from external hosts. For best production performance, build and self-host a minimized Tailwind stylesheet, optimize and self-host product images (WebP/AVIF where appropriate), and test Core Web Vitals. The CDN was retained to avoid breaking the existing custom utility classes and visual design without a browser-verified production build.

Product specifications, availability, warranty, delivery, installation, model names and technical claims must be confirmed by the business against current product documents before publication. In particular, check compressor branding/specifications and all voltage/phase/pressure claims; the website content is not independent evidence that these specifications are correct. Confirm the canonical domain and live deployment paths before launch.
