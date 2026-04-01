/** Backend may use camelCase or snake_case — normalizers accept both. */
export type UnknownRecord = Record<string, unknown>;

export interface BlogDto extends UnknownRecord {
  id?: string | number;
  title?: string;
  excerpt?: string;
  summary?: string;
  content?: string;
  body?: string;
  category?: string;
  tags?: string[];
  image?: string;
  cover_image?: string;
  coverImage?: string;
  published_at?: string;
  publishedAt?: string;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
  read_time?: string;
  readTime?: string;
}

export interface ReviewReplyDto extends UnknownRecord {
  id?: string | number;
  name?: string;
  author?: string;
  author_name?: string;
  text?: string;
  content?: string;
  body?: string;
  date?: string;
  created_at?: string;
  createdAt?: string;
}

export interface ReviewDto extends UnknownRecord {
  id?: string | number;
  name?: string;
  author?: string;
  author_name?: string;
  role?: string;
  author_role?: string;
  text?: string;
  content?: string;
  body?: string;
  rating?: number;
  date?: string;
  created_at?: string;
  createdAt?: string;
  service?: string;
  category?: string;
  practice_area?: string;
  replies?: ReviewReplyDto[];
}
