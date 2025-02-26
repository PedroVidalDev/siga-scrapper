import { AbsenceDTO } from "../Absences/AbsenceDTO";
import { DayTimesDTO } from "../Classtime/DayTimesDTO";
import { DisciplineDTO } from "../Disciplines/DisciplineDTO";
import { GradeDTO } from "../Grades/GradeDTO";

export class SigaDTO {
    public absences: AbsenceDTO[];
    public disciplines: DisciplineDTO[];
    public dayTimesDTO: DayTimesDTO[];
    public grades: GradeDTO[]

    constructor(absences: AbsenceDTO[], disciplines: DisciplineDTO[], dayTimesDTO: DayTimesDTO[], grades: GradeDTO[]) {
        this.absences = absences;
        this.disciplines = disciplines;
        this.dayTimesDTO = dayTimesDTO;
        this.grades = grades;
    }
}