import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/entities/client.entity';
import { User } from 'src/entities/user.entity';
import { ClientController } from 'src/modules/client/client.controller';
import CreateClientHandler from 'src/modules/client/handlers/create-client.handler';
import DeleteClientHandler from 'src/modules/client/handlers/delete-client.handler';
import EditClientHandler from 'src/modules/client/handlers/edit-client.handler';
import SearchClientHandler from 'src/modules/client/handlers/search-client.handler';

@Module({
  imports: [
    ConfigModule,
    JwtModule,
    TypeOrmModule.forFeature([User, Client]),
  ],
  controllers: [ClientController],
  providers: [
    CreateClientHandler,
    SearchClientHandler,
    EditClientHandler,
    DeleteClientHandler
  ],
})

export class ClientModule {}
