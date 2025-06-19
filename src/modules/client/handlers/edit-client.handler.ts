import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/client.entity';
import { User } from 'src/entities/user.entity';
import { CreateClientDto } from 'src/modules/client/dtos/create-client.dto';
import { EditClientBodyDto, EditClientParamDto } from 'src/modules/client/dtos/edit-client.dto';
import { Repository } from 'typeorm';

@Injectable()
class EditClientHandler {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ) {}

  async execute({ id }: EditClientParamDto, { name }: EditClientBodyDto) {

    const isExistingClient = await this.clientRepository.findOneBy({
       id: +id
    })

    if(!isExistingClient){
      throw new BadRequestException({ message: "This client does not exist" });
    }

    isExistingClient.nomeCompleto = name;
    
    await this.clientRepository.save(isExistingClient);
    
    return {
      message: "Client updated successfully"
    }
  }
}

export default EditClientHandler;
