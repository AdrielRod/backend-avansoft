import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/entities/client.entity';
import { Sale } from 'src/entities/sale.entity';
import { User } from 'src/entities/user.entity';
import CreateSaleHandler from 'src/modules/sales/handlers/create-sale.handler';
import SalesPerDayHandler from 'src/modules/sales/handlers/sales-per-day.handler';
import TopSalesHandler from 'src/modules/sales/handlers/top-sales.handler';
import { SalesController } from 'src/modules/sales/sales.controller';

@Module({
  imports: [
    ConfigModule,
    JwtModule,
    TypeOrmModule.forFeature([Sale, User, Client]),
  ],
  controllers: [SalesController],
  providers: [
    SalesPerDayHandler,
    TopSalesHandler,
    CreateSaleHandler
  ],
})

export class SalesModule {}
