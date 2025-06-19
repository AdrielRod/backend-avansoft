import { Controller, UseGuards, Get, Post, Body, } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CreateSaleDto } from 'src/modules/sales/dtos/create-sale.dto';
import CreateSaleHandler from 'src/modules/sales/handlers/create-sale.handler';
import SalesPerDayHandler from 'src/modules/sales/handlers/sales-per-day.handler';
import TopSalesHandler from 'src/modules/sales/handlers/top-sales.handler';

@Controller('sales')
export class SalesController {
  constructor(
    private salesPerDayHandler: SalesPerDayHandler,
    private topSalesHandler: TopSalesHandler,
    private createSaleHandler: CreateSaleHandler
  ) {}

  @Post('/')
  async createClient(
    @Body() body: CreateSaleDto,
  ) {
    return this.createSaleHandler.execute(body);
  }

  @UseGuards(AuthGuard)
  @Get('/per-day')
  async getSalesPerDay(
  ) {
    return this.salesPerDayHandler.execute();
  }

  @UseGuards(AuthGuard)
  @Get('/top')
  async getTopSales(
  ) {
    return this.topSalesHandler.execute();
  }
}
