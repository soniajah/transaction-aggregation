import { Injectable } from '@nestjs/common';
import { ITransactionReport } from './types/transaction.types';

@Injectable()
export class MockTransactionApi {
  fetchData(startTime: Date, endTime: Date): ITransactionReport {
    const userIds = ['1', '2', '3', '4', '5'];
    const types = ['balance', 'payout', 'spent', 'earned'];

    let data: ITransactionReport = {
      items: [],
    };
    for (let i = 0; i < 10; i++) {
      data.items.push({
        id: i.toString(),
        userId: userIds[Math.floor(Math.random() * userIds.length)],
        createdAt: new Date(),
        type: types[Math.floor(Math.random() * types.length)],
        amount: Math.floor(Math.random() * 100),
      });
    }
    return data;
  }
}
