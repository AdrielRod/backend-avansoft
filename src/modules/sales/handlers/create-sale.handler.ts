import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/client.entity';
import { Sale } from 'src/entities/sale.entity';
import { CreateSaleDto } from 'src/modules/sales/dtos/create-sale.dto';
import { Repository } from 'typeorm';

@Injectable()
class CreateSaleHandler {
  constructor(
    @InjectRepository(Client)
      private clientRepository: Repository<Client>,
    @InjectRepository(Sale)
      private saleRepository: Repository<Sale>
  ) {}

  async execute(body: CreateSaleDto){
    const client = await this.clientRepository.findOneBy({
      id: +body.client_id,
    })

    if(!client){
      throw new NotFoundException({message: "Client not found"})
    }

    const newSale = this.saleRepository.create({
      client: client,
      valor: body.value,
      data: body.date
    })

    this.saleRepository.save(newSale);
    
    return {
      message: "Sale created successfully"
    }
  }
}

export default CreateSaleHandler;
