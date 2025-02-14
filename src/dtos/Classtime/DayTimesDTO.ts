import { DayEnum } from "../../enums/DayEnum";
import { ClasstimeDTO } from "./ClasstimeDTO";

export class DayTimesDTO {
    public day!: DayEnum;
    public classtimeDto!: ClasstimeDTO[];

    constructor(day: DayEnum, classtimeDto: ClasstimeDTO[]) {
        this.day = day;
        this.classtimeDto = classtimeDto;
    }
}