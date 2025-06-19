import { FindManyOptions, Repository, ILike} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/client.entity';
import { SearchClientsQueryDto } from 'src/modules/client/dtos/search-client-all.dto';

@Injectable()
class SearchClientHandler {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ) {}

  async execute({ page, 
    page_size, 
    filter_by, 
    order_by = "ASC", 
    order_direction, 
    term 
  }: SearchClientsQueryDto) {

    const query: FindManyOptions<Client> = {
      skip: (page - 1) * page_size,
      take: page_size,
      order: {
        [order_by]: order_direction
      }
    }

    if(term) {
      query.where = {
        nomeCompleto: ILike(`%${term}%`)
      }
    }

    if (filter_by && term) {
      const fieldToFilter = filter_by === "name" ? "nomeCompleto" : "email" 
      query.where = {
        [fieldToFilter]: ILike(`%${term}%`)
      }
    }

    const [clients, total] = await this.clientRepository.findAndCount(query);

    const formattedClients = clients.map((client) => ({
      info: {
        id: client.id,
        nomeCompleto: client.nomeCompleto,
        detalhes: {
          email: client.email,
          nascimento: client.nascimento,
        },
      },
      duplicado: {
        nomeCompleto: client.nomeCompleto,
      },
      estatisticas: {
        vendas: client.vendas?.map((venda) => ({
          data: venda.data,
          valor: venda.valor,
        })) || [],
      },

    }));
    const page_count = Math.ceil(total / page_size);
  

    return {
      items: formattedClients,
      total, 
      page,
      page_size,
      page_count
    };
  }
}

export default SearchClientHandler;
