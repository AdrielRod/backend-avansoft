import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
class TopSalesHandler {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async execute() {
    const clients = await this.clientRepository.find({ relations: ['vendas'] });

    const result = clients.map(client => {
      const totalSales = client.vendas.reduce((sum, sale) => sum + Number(sale.valor), 0);
      const averageSale =
        client.vendas.length > 0 ? totalSales / client.vendas.length : 0;

      const uniqueDates = new Set(
        client.vendas.map(sale => new Date(sale.data).toDateString()),
      );

      return {
        client,
        totalSales,
        averageSale,
        frequency: uniqueDates.size,
      };
    });

    const topVolume = [...result].sort((a, b) => b.totalSales - a.totalSales)[0];
    const topAverage = [...result].sort((a, b) => b.averageSale - a.averageSale)[0];
    const topFrequency = [...result].sort((a, b) => b.frequency - a.frequency)[0];
    

    if(!topVolume || !topAverage || !topFrequency){
      //  mock.
      return [
        {
          id: 1,
          name: "John Doe",
          label: "higher sales volume"
        },
        {
          id: 2,
          name: "Cadu",
          label: "highest average value per sale"
        },
        {
          id: 3,
          name: "Bianca",
          label: "greater frequency of sales"
        }
      ];
    }

    return [
      {
        id: 1,
        name: topVolume.client.nomeCompleto,
        label: "higher sales volume",
      },
      {
        id: 2,
        name: topAverage.client.nomeCompleto,
        label: "highest average value per sale",
      },
      {
        id: 3,
        name: topFrequency.client.nomeCompleto,
        label: "greater frequency of sales",
      },
    ];
  }
}

export default TopSalesHandler;
