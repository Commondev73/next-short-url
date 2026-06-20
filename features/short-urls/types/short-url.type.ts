import type { ApiResponse, Pagination, Timestamps } from "@/shared/types/common";

export interface ShortUrl extends Timestamps {
  id: number;
  user_id: number;
  original_url: string;
  short_code: string;
  title: string | null;
  click_count: number;
  is_active: boolean;
  expires_at: string | null;
  short_url: string | null;
}

export interface ShortUrlsResponse extends ApiResponse<ShortUrl[]> {
  pagination: Pagination;
}

export interface ShortUrlsQueryParams {
  page?: number;
  perPage?: number;
}

export type { CreateShortUrlDto } from "../schemas/create-short-url.schema";
export type { UpdateShortUrlDto } from "../schemas/update-short-url.schema";
