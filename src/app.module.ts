import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';
import { ClientModule } from 'src/modules/client/client.module';

import { User } from 'src/entities/user.entity';
import { Sale } from 'src/entities/sale.entity';
import { Client } from 'src/entities/client.entity';
import { SalesModule } from 'src/modules/sales/sales.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Sale, Client]),
    AuthModule,
    ClientModule,
    SalesModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})

export class AppModule {}
