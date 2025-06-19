import { Client } from 'src/entities/client.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, client => client.vendas, { onDelete: 'CASCADE' })
  client: Client;

  @Column({ type: 'decimal' })
  valor: number;

  @Column({ type: 'date' })
  data: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}