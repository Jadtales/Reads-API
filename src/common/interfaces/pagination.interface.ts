export interface PaginationInterface<Type> {
  data: Type[];

  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };

  links: {
    firstPage: string;
    lastPage: string;

    currentPage: string;
    nextPage: string;
    previousPage: string;
  };
}
