// One place for every fact that appears across the site.
// Anything marked TODO is a stand-in and must be replaced before launch
// (`npm run check:launch` fails while any remain).

export const site = {
  url: 'https://sanjaysharmarealty.com',

  // Shown exactly as on the DRE license record. Verify on the DRE public lookup.
  brokerName: 'Sanjay Sharma',
  brokerTitle: 'Real Estate Broker',
  dreNumber: '01269063',
  independentStatement:
    'Independent real estate broker, not affiliated with a franchise or other brokerage.',

  tagline: 'Experience. Integrity. Results.',
  yearsExperience: 26,
  // Where he is based, and the area he serves. Shown on Home, Contact, the footer and in page descriptions.
  homeBase: 'Sacramento',
  serviceArea: 'Based in Sacramento, serving clients throughout California',

  // No phone number is published: visitors leave their details and Sanjay calls them.
  // TODO: confirm the address he wants inquiries sent to.
  email: 'sanjay@sanjaysharmarealty.com',

  // Leave a value empty to hide its link.
  social: {
    zillow: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    google: '',
  },

  // Appointment booking page (Calendly, Google Calendar appointment schedule...).
  // Empty hides every "Book a call" button.
  bookingUrl: '',

  // Where lead forms are POSTed as JSON (Formspree, Web3Forms, a CRM webhook...).
  // While empty, forms open the visitor's email app with the message filled in.
  formEndpoint: '',
  // Some form services (Web3Forms) identify the inbox with a public access key.
  // If set, it is sent with each submission as `access_key`.
  formAccessKey: '',

  // IDX (MLS search). Empty until an IDX account exists; then the site links to
  // the hosted search pages. See README.
  idx: {
    searchUrl: '',
    mlsName: 'MetroList',
  },

  // Sample listings, sales and testimonials make the design reviewable.
  // Set to false before launch: samples then disappear from every page.
  allowSampleContent: true,

  // Is he a current member of the National Association of REALTORS?
  // Only then may the REALTOR mark be used.
  isRealtorMember: false,
} as const;

export const licenseLine = `${site.brokerName}, ${site.brokerTitle} · DRE #${site.dreNumber}`;

// The site has two destinations: his listings, and a way to reach him.
export const nav = [
  { href: '/properties/', label: 'Listings' },
  { href: '/contact/', label: 'Contact' },
];

// What Sanjay offers. Each one opens the contact form with that topic already chosen,
// and the topic heads the message he receives.
export const services = [
  { id: 'buying', title: 'Buying a home', text: 'Find the right home and pay a fair price.', asksProperty: false },
  { id: 'selling', title: 'Selling a home', text: 'Learn what it is worth, then let Sanjay sell it.', asksProperty: true },
  { id: 'land', title: 'Land and investment', text: 'Lots, acreage and rental property.', asksProperty: false },
  { id: 'valuation', title: 'Free home valuation', text: 'What your property could sell for today.', asksProperty: true },
] as const;
