import type { BlogDto, ReviewDto, ReviewReplyDto } from "./types";

export type BlogCardModel = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
};

function str(v: unknown, fallback = ""): string {
  if (v === undefined || v === null) return fallback;
  return String(v);
}

function pickDate(b: BlogDto): string {
  const raw =
    b.publishedAt ??
    b.published_at ??
    b.createdAt ??
    b.created_at ??
    b.updatedAt ??
    b.updated_at;
  if (!raw) return "";
  const d = new Date(String(raw));
  if (Number.isNaN(d.getTime())) return String(raw);
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

export function mapBlogToCard(b: BlogDto): BlogCardModel {
  const content = str(b.content ?? b.body);
  const excerpt = str(b.excerpt ?? b.summary) || content.slice(0, 180) + (content.length > 180 ? "…" : "");
  const tags = Array.isArray(b.tags) ? b.tags.map((t) => String(t)) : [];
  const readTime = str(b.readTime ?? b.read_time) || (content ? estimateReadTime(content) : "—");
  const image =
    str(b.image ?? b.coverImage ?? b.cover_image) ||
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop";

  return {
    id: String(b.id ?? ""),
    category: str(b.category, "General"),
    title: str(b.title, "Untitled"),
    excerpt,
    date: pickDate(b) || "—",
    readTime,
    image,
    tags,
  };
}

export type ReviewUIModel = {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  service: string;
  replies: {
    id: number;
    name: string;
    text: string;
    date: string;
  }[];
};

function pickReviewDate(r: ReviewDto): string {
  const raw = r.date ?? r.createdAt ?? r.created_at;
  if (!raw) return new Date().toISOString().split("T")[0];
  const s = String(raw);
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? s : d.toISOString().split("T")[0];
}

function mapReply(reply: ReviewReplyDto, idx: number) {
  const idRaw = reply.id ?? idx;
  return {
    id: typeof idRaw === "number" ? idRaw : Number(idRaw) || idx,
    name: str(reply.name ?? reply.author ?? reply.author_name, "Team"),
    text: str(reply.text ?? reply.content ?? reply.body),
    date: (() => {
      const raw = reply.date ?? reply.createdAt ?? reply.created_at;
      if (!raw) return pickReviewDate({} as ReviewDto);
      const s = String(raw);
      if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
      const d = new Date(s);
      return Number.isNaN(d.getTime()) ? s : d.toISOString().split("T")[0];
    })(),
  };
}

export function mapReviewToUI(r: ReviewDto, idx: number): ReviewUIModel {
  const idRaw = r.id ?? idx;
  const replies = Array.isArray(r.replies) ? r.replies.map(mapReply) : [];
  return {
    id: typeof idRaw === "number" ? idRaw : Number(idRaw) || idx,
    name: str(r.name ?? r.author ?? r.author_name, "Anonymous"),
    role: str(r.role ?? r.author_role, "Client"),
    text: str(r.text ?? r.content ?? r.body),
    rating: typeof r.rating === "number" ? r.rating : Number(r.rating) || 0,
    date: pickReviewDate(r),
    service: str(r.service ?? r.category ?? r.practice_area, "General"),
    replies,
  };
}

export function buildCreateReviewPayload(input: {
  name: string;
  role: string;
  service: string;
  rating: number;
  text: string;
}) {
  return {
    name: input.name,
    role: input.role || undefined,
    service: input.service,
    rating: input.rating,
    text: input.text,
  };
}
