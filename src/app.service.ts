import { Injectable } from '@nestjs/common';
import { MockTransactionApi } from './mockTransactionApi';
import { IUserReport, IPayoutReport } from './types/app.types';
import { AppStore } from './app.store';

@Injectable()
export class AppService {
  constructor(
    private readonly mockApi: MockTransactionApi,
    private readonly store: AppStore,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getAggregatedDataByUserId(userId: string): IUserReport {
    let report: IUserReport = {
      userId: userId,
      balance: 0,
      earned: 0,
      payout: 0,
      spent: 0,
    };
    this.store.getData().forEach((item) => {
      if (item.userId === userId) {
        report[item.type] += item.amount;
      }
    });
    return report;
  }

  getListOfRequestedPayouts(): IPayoutReport {
    const allPayouts = this.store
      .getData()
      .filter((item) => item.type === 'payout');
    const groupedPayouts = allPayouts.reduce((acc, payout) => {
      if (!acc[payout.userId]) {
        acc[payout.userId] = 0;
      }
      acc[payout.userId] += payout.amount;
      return acc;
    }, {});
    const result = Object.keys(groupedPayouts).map((userId) => ({
      userId,
      amount: groupedPayouts[userId],
    }));

    return { users: result };
  }

  fetchDataFromExternalAPI() {
    const data = this.mockApi.fetchData(new Date(), new Date());
    this.store.addData(data.items);
  }
}
