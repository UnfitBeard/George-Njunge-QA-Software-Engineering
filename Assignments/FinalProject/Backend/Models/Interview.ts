import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Application } from "./Application";

@Entity()
export class Interview {
  @PrimaryGeneratedColumn()
  interview_id!: number;

  @ManyToOne(() => Application, application => application.application_id)
  @JoinColumn({ name: 'application_id' })
  application!: Application;

  @Column({ type: 'timestamp' })
  date_time!: Date;

  @Column({})
  interview_type!:string
}