import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { IPayoutReport, IUserReport } from './types/app.types';
import { Cron } from '@nestjs/schedule';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getAggregatedDataByUserId/:userId')
  getAggregatedDataByUserId(@Param('userId') userId: string): IUserReport {
    return this.appService.getAggregatedDataByUserId(userId);
  }

  @Get('getListOfRequestedPayouts')
  getListOfRequestedPayouts(): IPayoutReport {
    return this.appService.getListOfRequestedPayouts();
  }

  // Method to fetch data from external API
  @Cron('*/12 * * * * *') // Runs every 12 seconds
  fetchDataFromExternalAPI() {
    // Logic to fetch data from external API
    this.appService.fetchDataFromExternalAPI();
    console.log('Fetching data from external API');
  }
}
