import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/client.entity';
import { User } from 'src/entities/user.entity';
import { CreateClientDto } from 'src/modules/client/dtos/create-client.dto';
import { Repository } from 'typeorm';

@Injectable()
class CreateClientHandler {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ) {}

  async execute({ email, name, dateOfBirth }: CreateClientDto, user: User) {
    const isExistingClient = await this.clientRepository.findOneBy({
      email
    })

    if(isExistingClient){
      throw new BadRequestException({ message: "This client already exists" });
    }

    const newClient = this.clientRepository.create({
      email,
      nomeCompleto: name,
      nascimento: dateOfBirth
    })

    await this.clientRepository.save(newClient)
    
    return {
      data: {
        id: newClient.id
      },
      message: "Client created successfully"
    }
  }
}

export default CreateClientHandler;
