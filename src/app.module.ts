import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockTransactionApi } from './mockTransactionApi';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, MockTransactionApi],
})
export class AppModule {}
