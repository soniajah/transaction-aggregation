import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockTransactionApi } from './mockTransactionApi';
import { AppStore } from './app.store';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, MockTransactionApi, AppStore],
})
export class AppModule {}
