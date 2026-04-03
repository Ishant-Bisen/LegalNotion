import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { PATHS } from "../routes/paths";

const SITE = "https://legalnotion.in";

type RouteConfig = {
  title: string;
  description: string;
  canonicalPath: string;
  keywords: string;
};

const ROUTES: Record<string, RouteConfig> = {
  [PATHS.home]: {
    title: "Legal Notion | Legal Services — Company Registration & Trademark in India",
    description:
      "Legal services in India: company registration (Pvt Ltd, LLP, OPC), trademark filing, ROC compliance, contracts, and documentation for startups and businesses.",
    canonicalPath: PATHS.home,
    keywords:
      "legal services India, company registration India, legal-services, Pvt Ltd registration, LLP registration, OPC registration, trademark registration India, ROC compliance, startup legal India, corporate compliance, Legal Notion",
  },
  [PATHS.legalServices]: {
    title: "Legal Services India | Company Registration, Trademark & Compliance | Legal Notion",
    description:
      "Corporate legal services: company registration, incorporation (Pvt Ltd, LLP, OPC), trademark registration, compliance, contracts, and fundraising documentation for Indian businesses.",
    canonicalPath: PATHS.legalServices,
    keywords:
      "legal services, company registration, company-registration, business incorporation India, trademark filing, ROC compliance, legal documentation, startup legal counsel, contract drafting, Legal Notion",
  },
  [PATHS.aboutUs]: {
    title: "Legal Notion | About Us — Legal Partners for Startups in India",
    description:
      "Meet Legal Notion: a client-first legal team for company registration, IP, compliance, and documentation across India.",
    canonicalPath: PATHS.aboutUs,
    keywords:
      "about Legal Notion, legal firm India, startup lawyers, corporate legal team Pune, business legal partners",
  },
  [PATHS.legalBlog]: {
    title: "Legal Notion | Legal Blog — Company Law, Trademarks & Compliance",
    description:
      "Legal insights on company registration, trademark law, ROC filings, startup compliance, and best practices for businesses in India.",
    canonicalPath: PATHS.legalBlog,
    keywords:
      "legal blog India, company law articles, trademark guides, compliance tips, startup legal insights",
  },
  [PATHS.clientReviews]: {
    title: "Legal Notion | Client Reviews — Legal Services Testimonials",
    description:
      "Client reviews of Legal Notion’s company registration, trademark, and compliance services across India.",
    canonicalPath: PATHS.clientReviews,
    keywords:
      "Legal Notion reviews, legal services reviews India, company registration feedback, client testimonials",
  },
  [PATHS.careers]: {
    title: "Legal Notion | Careers — Legal & Compliance Roles in India",
    description:
      "Careers at Legal Notion — help startups and businesses with legal registration, compliance, and documentation in India.",
    canonicalPath: PATHS.careers,
    keywords:
      "legal careers India, law firm jobs, compliance careers, Legal Notion hiring",
  },
};

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/** Legacy / alias URLs (before Navigate) still need the right tab title + meta. */
const PATH_ALIASES: Record<string, string> = {
  "/services": PATHS.legalServices,
  "/about": PATHS.aboutUs,
  "/blogs": PATHS.legalBlog,
  "/reviews": PATHS.clientReviews,
  "/legal-service": PATHS.legalServices,
  "/company-registration": PATHS.legalServices,
};

function resolveRouteKey(pathname: string): string {
  const p = normalizePath(pathname);
  return PATH_ALIASES[p] ?? p;
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

/**
 * Per-route title, description, keywords, og/twitter, and canonical (SPA).
 */
export default function DocumentSeo() {
  const { pathname } = useLocation();
  const routeKey = useMemo(() => resolveRouteKey(pathname), [pathname]);
  const config = ROUTES[routeKey] ?? ROUTES[PATHS.home];

  useEffect(() => {
    document.title = config.title;
    setMeta("description", config.description);
    setMeta("keywords", config.keywords);

    setMeta("og:title", config.title, "property");
    setMeta("og:description", config.description, "property");
    setMeta("og:url", `${SITE}${config.canonicalPath}`, "property");

    setMeta("twitter:title", config.title);
    setMeta("twitter:description", config.description);

    setCanonical(`${SITE}${config.canonicalPath}`);
  }, [pathname, config]);

  return null;
}
