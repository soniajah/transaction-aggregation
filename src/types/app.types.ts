export interface IUserReport {
  userId: string;
  balance: number;
  payout: number;
  spent: number;
  earned: number;
}

export interface IUserPayoutReport {
  userId: string;
  amount: number;
}

export interface IPayoutReport {
  users: IUserPayoutReport[];
}
