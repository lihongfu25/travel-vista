export type ApiItemResponse<T> = {
  data: T;
};

export type ApiObjectResponse<T> = {
  data: T;
};

export type ApiSuccessResponse = {
  data: { success: boolean };
};

export type ApiCollectionResponse<T> = {
  data: T[];
};

export type ApiPaginateResponse<T> = {
  data: T[];
  meta: {
    pagination: IPaginationMeta;
  };
};

export interface IPaginationOptions {
  /**
   * the amount of items to be requested per page
   */
  limit?: number;
  /**
   * the page that is requested
   */
  page?: number;
  /**
   * a babasesic route for generating links (i.e., WITHOUT query params)
   */
  route?: string;
}

export interface IPaginationMeta {
  /**
   * the amount of items on this specific page
   */
  itemCount: number;
  /**
   * the total amount of items
   */
  totalItems: number;
  /**
   * the amount of items that were requested per page
   */
  itemsPerPage: number;
  /**
   * the total amount of pages in this paginator
   */
  totalPages: number;
  /**
   * the current page this paginator "points" to
   */
  currentPage: number;
}

export class Pagination<T> {
  constructor(
    /**
     * a list of items to be returned
     */
    public readonly items: T[],
    /**
     * associated meta information (e.g., counts)
     */
    public readonly meta: IPaginationMeta
  ) {}
}
