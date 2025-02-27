import { DisciplineDTO } from "../dtos/Disciplines/DisciplineDTO"

export class Discipline {
    private id: number | undefined
    private cod!: string
    private name!: string
    private teacher!: string

    constructor(disciplineDto: DisciplineDTO) {
        if(disciplineDto.id) {
            this.setId(disciplineDto.id);
        }
        this.setCod(disciplineDto.cod);
        this.setName(disciplineDto.name);
        this.setTeacher(disciplineDto.teacher);
    }

    getId(): number | undefined {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getCod(): string {
        return this.cod;
    }

    setCod(cod: string): void {
        this.cod = cod;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getTeacher(): string {
        return this.teacher;
    }

    setTeacher(teacher: string): void {
        this.teacher = teacher;
    }
}