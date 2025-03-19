export type Pagination<T> = {
  totals: number;
  take?: number;
  skip?: number;
  items: T;
};
