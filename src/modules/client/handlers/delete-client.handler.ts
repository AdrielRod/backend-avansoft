import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/client.entity';
import { DeleteClientParamDto } from 'src/modules/client/dtos/delete-client.dto';
import { Repository } from 'typeorm';

@Injectable()
class DeleteClientHandler {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ) {}

  async execute({ id }: DeleteClientParamDto) {

    const isExistingClient = await this.clientRepository.findOneBy({
       id: +id
    })

    if(!isExistingClient){
      return {
        message: "Client deleted successfully"
      }
    }
    
    await this.clientRepository.delete({ id: +id });
    
    return {
      message: "Client deleted successfully"
    }
  }
}

export default DeleteClientHandler;
