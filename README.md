# sanjaysharmarealty.com

Website for Sanjay Sharma, independent California real estate broker (DRE #01269063).

Static site built with [Astro](https://astro.build). No database and no server: it builds to plain
HTML and can be hosted free on Cloudflare Pages, Netlify or Vercel.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:4321. `npm run build` writes the finished site to `dist/`.

## Where things live

| To change | Edit |
| --- | --- |
| Phone, email, license number, areas, social links, booking link | `src/config/site.ts` |
| Listings | `src/data/listings.json` |
| Past sales (empty for now; the track-record sections appear once rows are added) | `src/data/sales.json` |
| Testimonials | `src/data/testimonials.json` |
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

## Not wired up yet

- **Forms.** `formEndpoint` in `src/config/site.ts` is empty, so forms open the visitor's email app
  instead of sending. Set it to a form service URL (Formspree, Web3Forms, or a CRM webhook) to send
  directly.
- **Appointment booking.** Set `bookingUrl` and the "Book a call" buttons appear.
- **IDX / MLS search.** Set `idx.searchUrl` once an IDX account exists and a "Search the MLS" panel
  appears on the Properties page.
- **Hosting and domain.** Nothing is deployed.

## Before launch

```bash
npm run build
```

```bash
npm run check:launch
```

The check fails while any stand-in content remains: placeholder blocks, sample listings, the
555 phone number, or unconfigured forms. Also confirm by hand:

- [ ] `allowSampleContent` set to `false` in `src/config/site.ts`
- [ ] Broker name matches the DRE license record exactly
- [ ] Whether "Sanjay Sharma Realty" is a registered DBA. The site is branded with his personal
      name, which needs no DBA; the domain is used only as an address
- [ ] `isRealtorMember` is correct before any REALTOR mark is added
- [ ] Privacy policy reviewed and dated
- [ ] Every figure, award and testimonial is accurate and used with permission
