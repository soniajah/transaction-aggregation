import { Injectable } from '@nestjs/common';
import {
  ITransactionItem,
  ITransactionReport,
} from './types/transaction.types';

@Injectable()
export class AppStore {
  private allData: ITransactionReport = {
    items: [],
  };
  getData(): ITransactionItem[] {
    return this.allData.items;
  }

  addData(data: ITransactionItem[]) {
    this.allData.items.push(...data);
  }
}
