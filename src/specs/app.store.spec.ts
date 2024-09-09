import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { AppStore } from '../app.store';
import { MockTransactionApi } from '../mockTransactionApi';

describe('AppStore', () => {
  let store: AppStore;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, AppStore, MockTransactionApi],
    }).compile();

    store = app.get<AppStore>(AppStore);
  });

  describe('addData', () => {
    it('should Add the data', () => {
      let entries = [
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
      ];
      store.addData(entries);
      expect(store.getData()).toEqual(entries);
    });
  });
});
