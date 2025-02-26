import { DisciplineDTO } from "../Disciplines/DisciplineDTO";

export class GradeDTO {
    public discipline: DisciplineDTO;
    public firstGrade: number;
    public secondGrade: number;
    public thirdGrade: number;

    constructor(discipline: DisciplineDTO, firstGrade: number, secondGrade: number, thirdGrade: number) {
        this.discipline = discipline;
        this.firstGrade = firstGrade;
        this.secondGrade = secondGrade;
        this.thirdGrade = thirdGrade;
    }
}