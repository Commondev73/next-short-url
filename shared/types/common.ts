export interface Timestamps {
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface ApiResponse<T = null> {
  status: "success" | "error";
  message: string;
  data: T;
  errors?: Record<string, string[]>;
}
