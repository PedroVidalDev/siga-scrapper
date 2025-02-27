import 'reflect-metadata';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Discipline } from '../entities/Discipline';

@Entity()
export class DisciplineModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    cod!: string

    @Column()
    name!: string

    @Column()
    teacher!: string

    constructor(entity: Discipline) {
        this.cod = entity.getCod();
        this.name = entity.getName();
        this.teacher = entity.getTeacher();
    }

    toEntity(): Discipline {
        return new Discipline(
            this.id,
            this.cod,
            this.name,
            this.teacher
        );
    }
}