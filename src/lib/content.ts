import { site } from '../config/site';
import listingsData from '../data/listings.json';
import salesData from '../data/sales.json';
import testimonialsData from '../data/testimonials.json';

export type ListingStatus = 'active' | 'pending' | 'sold' | 'hidden';
export type ListingCategory = 'home' | 'land' | 'investment';

export interface Listing {
  id: string;
  sample?: boolean;
  status: ListingStatus;
  category: ListingCategory;
  address: string;
  city: string;
  price: number;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  acres: number | null;
  headline: string;
  description: string;
  photos: string[];
  photosAltered: boolean;
  originalPhotosUrl: string;
  mlsNumber: string;
}

export interface Sale {
  sample?: boolean;
  year: number;
  city: string;
  type: string;
  side: 'Buyer' | 'Seller' | 'Both';
  price: number;
}

export interface Testimonial {
  sample?: boolean;
  quote: string;
  name: string;
  context: string;
}

const keep = <T extends { sample?: boolean }>(rows: T[]) =>
  rows.filter((r) => site.allowSampleContent || !r.sample);

const statusOrder: Record<ListingStatus, number> = { active: 0, pending: 1, sold: 2, hidden: 3 };

/** Every listing a visitor may see: hidden ones and (after launch) samples are dropped. */
export const listings: Listing[] = keep(listingsData as Listing[])
  .filter((l) => l.status !== 'hidden')
  .sort((a, b) => statusOrder[a.status] - statusOrder[b.status] || b.price - a.price);

export const sales: Sale[] = keep(salesData as Sale[]).sort((a, b) => b.year - a.year);

export const testimonials: Testimonial[] = keep(testimonialsData as Testimonial[]);

export const categoryLabel: Record<ListingCategory, string> = {
  home: 'Home',
  land: 'Land',
  investment: 'Investment',
};

export const statusLabel: Record<ListingStatus, string> = {
  active: 'For sale',
  pending: 'Sale pending',
  sold: 'Sold',
  hidden: 'Hidden',
};

export const usd = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export const num = (n: number) => new Intl.NumberFormat('en-US').format(n);

/** "4 bd · 3 ba · 2,410 sq ft" or "5.2 acres" */
export const facts = (l: Listing) =>
  [
    l.beds != null && `${l.beds} bd`,
    l.baths != null && `${l.baths} ba`,
    l.sqft != null && `${num(l.sqft)} sq ft`,
    l.acres != null && `${l.acres} acres`,
  ]
    .filter(Boolean)
    .join(' · ');

/** Headline figures are computed from the sales rows so they never go stale. */
export const trackRecord = () => {
  const volume = sales.reduce((sum, s) => sum + s.price, 0);
  const years = sales.map((s) => s.year);
  return {
    count: sales.length,
    volume,
    cities: new Set(sales.map((s) => s.city)).size,
    from: years.length ? Math.min(...years) : null,
    to: years.length ? Math.max(...years) : null,
    hasSamples: sales.some((s) => s.sample),
  };
};
