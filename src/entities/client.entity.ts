import { Sale } from 'src/entities/sale.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeCompleto: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'date' })
  nascimento: Date;

  @OneToMany(() => Sale, sale => sale.client)
  vendas: Sale[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}