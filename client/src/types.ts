export interface IAuction {
  id: string;
  name: string;
  price: number;
  priceBIN: number;
  auctionStart: Date;
  auctionEnd: Date;
  bids: IBid[];
}

export interface IBid {
  id: string;
  name: string;
  price: number;
  createdAt: string;
}

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
