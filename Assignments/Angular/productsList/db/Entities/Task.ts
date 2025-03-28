import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  duration!: number

  @Column({ default: false })
  completed!: boolean;
}
