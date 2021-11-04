export interface IDonation {
  id?: string;
  displayName: string;
  email: string;
  count: number;
  team?: string;
  message?: string;
  createdAt: string;
}

export interface IPaginateCursor<T> {
  items: T[];
  cursor: string;
}
