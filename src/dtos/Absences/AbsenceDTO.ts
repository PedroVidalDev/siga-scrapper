import { DisciplineDTO } from "../Disciplines/DisciplineDTO";

export class AbsenceDTO {
    public presences: number;
    public absences: number;
    public discipline?: DisciplineDTO;

    constructor(presences: number, absences: number, discipline?: DisciplineDTO) {
        this.presences = presences;
        this.absences = absences;
        this.discipline = discipline;
    }
}