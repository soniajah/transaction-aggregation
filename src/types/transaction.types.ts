export interface ITransactionItem {
  id: string;
  userId: string;
  createdAt: Date;
  type: string;
  amount: number;
}

export interface ITransactionReport {
  items: ITransactionItem[];
}
