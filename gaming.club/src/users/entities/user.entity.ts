import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  registerDate: string;

  @Column()
  lastActivityDate: string;

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn()
  role: Role;

  @OneToMany(() => Reservation, (reserv) => reserv.user)
  reservations: Reservation[];
}
