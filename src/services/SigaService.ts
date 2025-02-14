import { AbsenceDTO } from "../dtos/Absences/AbsenceDTO";
import { LoginDTO } from "../dtos/Auth/LoginDTO";
import { ClasstimeDTO } from "../dtos/Classtime/ClasstimeDTO";
import { DayTimesDTO } from "../dtos/Classtime/DayTimesDTO";
import { ScraperService } from "./ScraperService";

export class SigaService {
    private scraperService: ScraperService;

    constructor() {
        this.scraperService = new ScraperService();
    }

    public async getAbsencesInfo(loginDto: LoginDTO): Promise<AbsenceDTO[]> {
        const absencesList: AbsenceDTO[] | undefined = await this.scraperService.getAbsencesInfo(loginDto);
        if(absencesList) {
            return absencesList;
        } else {
            throw new Error("Erro ao pegar informações.");
        }
    }

    public async getClasstimeInfo(loginDto: LoginDTO): Promise<DayTimesDTO[]> {
        const dayTimesList: DayTimesDTO[] | undefined = await this.scraperService.getClasstimeInfo(loginDto);
        if(dayTimesList) {
            return dayTimesList;
        } else {
            throw new Error("Erro ao pegar informações.");
        }
    }
}