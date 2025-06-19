import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from 'src/entities/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
class SalesPerDayHandler {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>
  ) {}

  async execute(){
    const today = new Date();

    const salesOfToday = await this.saleRepository.find({
      where: {
        data: today
      }
    })

    // if(salesOfToday.length){
    //     const response = salesOfToday.map(sale => {
    //         const date = new Date(sale.data);
    //         return {
    //             x: String(date.getDate()).padStart(2, '0'),
    //             y: sale.valor
    //         }
    //     })

    //     return response
    // }

    // mock.

    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const salesPerDay: Array<{ x: string; y: number }> = [];

    const date = new Date(startDate);

    while (date <= today) {
    const formattedDate = String(date.getDate()).padStart(2, '0');
      const total = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

      salesPerDay.push({ x: formattedDate, y: total });

      date.setDate(date.getDate() + 1);
    }

    return salesPerDay;
  }
}

export default SalesPerDayHandler;
