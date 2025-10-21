export interface PaginationConfig {
  current_page: number;
  limit: number;
  total_data: number;
  total_pages: number;
  has_next?: number | null;
  has_prev?: number | null;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: PaginationConfig;
}

export function calcTotalPages(total: number, limit: number): number {
  if (limit === 0) {
    return 0;
  }
  return Math.ceil(total / limit);
}

export function paginate<T>(
  data: T[],
  total: number,
  offset: number,
  limit: number,
): PaginationResult<T> {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = calcTotalPages(total, limit);

  const hasNext = currentPage < totalPages ? currentPage + 1 : null;
  const hasPrev = currentPage > 1 ? currentPage - 1 : null;

  return {
    data,
    pagination: {
      current_page: currentPage,
      limit,
      total_data: total,
      total_pages: totalPages,
      has_next: hasNext,
      has_prev: hasPrev,
    },
  };
}
