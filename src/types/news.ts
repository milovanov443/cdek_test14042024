export interface NewsImage {
  s: string;
  m: string;
  l: string;
  hd: string;
}

export interface NewsCover {
  type: string;
  images: NewsImage[];
}

export interface Rubric {
  id: number;
  slug: string;
  name: string;
}

export interface NewsItem {
  id: string;
  title: string;
  cover: NewsCover | null;
  likeCount: number;
  viewCount: number;
  publishedAt: string;
  rubrics: Rubric[];
}

export interface NewsResponse {
  totalPages: number;
  perPage: number;
  news: NewsItem[];
  minDatePublication: string;
}

export type NewsBlockVariant = 'company' | 'business' | 'empty';
