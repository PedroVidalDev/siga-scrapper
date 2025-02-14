import { AbsenceDTO } from "../dtos/Absences/AbsenceDTO";
import { LoginDTO } from "../dtos/Auth/LoginDTO";
import { ClasstimeDTO } from "../dtos/Classtime/ClasstimeDTO";
import { DayEnum } from "../enums/DayEnum";
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

    public async getClasstimeInfo(loginDto: LoginDTO, day: DayEnum): Promise<ClasstimeDTO[]> {
        const classtimeList: ClasstimeDTO[] | undefined = await this.scraperService.getClasstimeInfo(loginDto, day);
        if(classtimeList) {
            return classtimeList;
        } else {
            throw new Error("Erro ao pegar informações.");
        }
    }
}