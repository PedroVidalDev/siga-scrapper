import { DayEnum } from "../../enums/DayEnum";
import { DisciplineDTO } from "../Disciplines/DisciplineDTO";

export class ClasstimeDTO {
    public discipline: DisciplineDTO;
    public day: DayEnum;
    public startTime: string;
    public endTime: string;

    constructor(discipline: DisciplineDTO, day: DayEnum, startTime: string, endTime: string) {
        this.discipline = discipline;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}