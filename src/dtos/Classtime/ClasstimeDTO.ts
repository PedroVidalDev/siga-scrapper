import { DayEnum } from "../../enums/DayEnum";
import { DisciplineDTO } from "../Disciplines/DisciplineDTO";

export class ClasstimeDTO {
    public startTime: string;
    public endTime: string;
    public discipline?: DisciplineDTO;

    constructor(startTime: string, endTime: string, discipline?: DisciplineDTO) {
        this.discipline = discipline;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}