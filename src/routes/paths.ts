/**
 * Canonical URL paths (keyword-style slugs for SEO).
 * Old paths (/services, /about, …) redirect via App routes + public/_redirects.
 */
export const PATHS = {
  home: "/",
  legalServices: "/legal-services",
  aboutUs: "/about-us",
  legalBlog: "/legal-blog",
  clientReviews: "/client-reviews",
  careers: "/careers",
} as const;

export const navItems = [
  { label: "Home", path: PATHS.home },
  { label: "Services", path: PATHS.legalServices },
  { label: "About", path: PATHS.aboutUs },
  { label: "Blogs", path: PATHS.legalBlog },
  { label: "Reviews", path: PATHS.clientReviews },
  { label: "Careers", path: PATHS.careers },
] as const;
