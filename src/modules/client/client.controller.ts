import { Controller, Post, Body, UseGuards, Get, Query, Patch, Param, Delete } from '@nestjs/common';
import { AuthUser } from 'src/decorators/auth/user.decorator';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CreateClientDto } from 'src/modules/client/dtos/create-client.dto';
import { DeleteClientParamDto } from 'src/modules/client/dtos/delete-client.dto';
import { EditClientBodyDto, EditClientParamDto } from 'src/modules/client/dtos/edit-client.dto';
import { SearchClientsQueryDto } from 'src/modules/client/dtos/search-client-all.dto';
import CreateClientHandler from 'src/modules/client/handlers/create-client.handler';
import DeleteClientHandler from 'src/modules/client/handlers/delete-client.handler';
import EditClientHandler from 'src/modules/client/handlers/edit-client.handler';
import SearchClientHandler from 'src/modules/client/handlers/search-client.handler';

@Controller('client')
export class ClientController {
  constructor(
    private createClientHandler: CreateClientHandler,
    private searchClientHandler: SearchClientHandler,
    private editClientHandler: EditClientHandler,
    private deleteClientHandler: DeleteClientHandler
  ) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async createClient(
    @Body() createClientDto: CreateClientDto,
    @AuthUser() user: User,
  ) {
    return this.createClientHandler.execute(createClientDto, user);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async editClient(
    @Body() body: EditClientBodyDto,
    @Param() id: EditClientParamDto,
    @AuthUser() user: User,
  ) {
    return this.editClientHandler.execute(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteClient(
    @Param() id: DeleteClientParamDto,
  ) {
    return this.deleteClientHandler.execute(id);
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async searchClient(
    @Query() query: SearchClientsQueryDto,
    @AuthUser() user: User,
  ) {
    return this.searchClientHandler.execute(query);
  }
}
