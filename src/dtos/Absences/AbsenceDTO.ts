export class AbsenceDTO {
    public presences: number;
    public absences: number;
    public discipline: string;
    public teacher?: string;

    constructor(presences: number, absences: number, discipline: string, teacher?: string) {
        this.presences = presences;
        this.absences = absences;
        this.discipline = discipline;
        this.teacher = teacher;
    }
}