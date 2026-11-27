# sanjaysharmarealty.com

Website for Sanjay Sharma, independent California real estate broker (DRE #01269063).

Static site built with [Astro](https://astro.build). No database and no server: it builds to plain
HTML and can be hosted free on Cloudflare Pages, Netlify or Vercel.

## What the site is

Two destinations: **Listings** and **Contact**. The Home page introduces Sanjay, lists the
services he offers (buying, selling, land and investment, free home valuation) and shows current
listings. Each service opens the contact form with that topic already chosen, and the topic heads
the message he receives. Nothing is done on the site itself: every path ends with the visitor
leaving a name and a phone number or email, and Sanjay getting in touch.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:4321. `npm run build` writes the finished site to `dist/`.

## Preview link

Every push to `main` publishes a preview copy with GitHub Pages
(`.github/workflows/preview.yml`). It is marked "noindex" so search engines skip it. The preview
lives in a sub-folder (`/sanjaysharmarealty/`); the build sets `SITE_BASE` so links still work
there. The real site will sit at the root of its own domain and needs neither setting.

## Where things live

| To change | Edit |
| --- | --- |
| Email, license number, areas, social links, booking link | `src/config/site.ts` |
| Listings | `src/data/listings.json` |
| Past sales (empty for now; the track-record sections appear once rows are added) | `src/data/sales.json` |
| Testimonials (empty for now; the first one shows on the Home page once added) | `src/data/testimonials.json` |
| Services listed on Home and in the contact form | `services` in `src/config/site.ts` |
| Headshot | drop the file at `src/assets/headshot.jpg` |
| Page wording | `src/pages/*.astro` |
| Colors and type | `src/styles/global.css` |

## Updating listings

Each listing is one block in `src/data/listings.json`.

- **Add**: copy a block, give it a new `id` (used in the page address), fill in the fields.
- **Remove**: set `"status": "hidden"`, or delete the block.
- **Mark sold or pending**: change `status` to `"sold"` or `"pending"`.
- **Photos**: put files in `public/listings/` and list them as `"/listings/file-name.jpg"`.
- **Edited or virtually staged photos**: set `"photosAltered": true` and put a link to the
  unaltered originals in `originalPhotosUrl`. California requires the disclosure (AB 723).

`status` is one of `active`, `pending`, `sold`, `hidden`. `category` is one of `home`, `land`,
`investment`. Leave fields that do not apply as `null`.

Committing the change redeploys the site once hosting is connected to this repository.

## Adding testimonials

`src/data/testimonials.json` is empty, so no quote is shown. To add one, put a block
like this between the square brackets (separate several with commas):

```json
{
  "quote": "What the client said, in their words.",
  "name": "First name and last initial, or however they agreed to be named",
  "context": "Sold a home in Elk Grove, 2025"
}
```

The first quote then shows on the Home page. Use only
real clients' words, with their permission.

## Not wired up yet

- **Forms.** No phone number is published: visitors leave their details and Sanjay calls them back,
  so the forms are the only way in. `formEndpoint` in `src/config/site.ts` is still empty, which
  means forms open the visitor's email app instead of sending. Set it to a form service URL
  (Formspree, Web3Forms, or a CRM webhook) so each inquiry lands in his inbox. For Web3Forms, also
  set `formAccessKey`.
- **Appointment booking.** Set `bookingUrl` and the "Book a call" buttons appear.
- **His own listings from the MLS.** The site links to Sanjay's MetroList search
  (`idx.searchUrl` in `src/config/site.ts`), which shows every home for sale and is always
  current. His own listings on the site still come from `src/data/listings.json`. Showing them
  automatically needs an IDX feed from MetroList through an IDX provider.
- **Hosting and domain.** Nothing is deployed.

## Before launch

```bash
npm run build
```

```bash
npm run check:launch
```

The check fails while any stand-in content remains: placeholder blocks, sample listings or
unconfigured forms. Also confirm by hand:

- [ ] `allowSampleContent` set to `false` in `src/config/site.ts`
- [ ] Broker name matches the DRE license record exactly
- [ ] Whether "Sanjay Sharma Realty" is a registered DBA. The site is branded with his personal
      name, which needs no DBA; the domain is used only as an address
- [ ] `isRealtorMember` is correct before any REALTOR mark is added
- [ ] Privacy policy reviewed and dated
- [ ] Every figure, award and testimonial is accurate and used with permission
