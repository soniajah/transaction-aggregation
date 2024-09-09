import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { AppStore } from '../app.store';
import { MockTransactionApi } from '../mockTransactionApi';

describe('AppController', () => {
  let appController: AppController;
  let store: AppStore;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, AppStore, MockTransactionApi],
    }).compile();

    store = app.get<AppStore>(AppStore);
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('getAggregatedDataByUserId', () => {
    it('should return aggregated data for a user', () => {
      store.addData([
        {
          amount: 100,
          createdAt: new Date(),
          id: '1',
          userId: '1',
          type: 'payout',
        },
      ]);
      expect(appController.getAggregatedDataByUserId('1')).toEqual({
        userId: '1',
        balance: 0,
        earned: 0,
        payout: 100,
        spent: 0,
      });
    });
  });

  describe('getListOfRequestedPayouts', () => {
    it('should return a list of requested payouts', () => {
      console.log(store);
      store.addData([
        {
          amount: 100,
          createdAt: new Date(),
          id: '1',
          userId: '1',
          type: 'payout',
        },
        {
          amount: 100,
          createdAt: new Date(),
          id: '1',
          userId: '1',
          type: 'payout',
        },
        {
          amount: 100,
          createdAt: new Date(),
          id: '1',
          userId: '1',
          type: 'spent',
        },
        {
          amount: 100,
          createdAt: new Date(),
          id: '1',
          userId: '2',
          type: 'payout',
        },
      ]);
      expect(appController.getListOfRequestedPayouts()).toEqual({
        users: [
          { userId: '1', amount: 200 },
          { userId: '2', amount: 100 },
        ],
      });
    });
  });
});
