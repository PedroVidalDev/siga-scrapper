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

    public async getSigaInfos(loginDto: LoginDTO): Promise<void> {
        console.log(await this.scraperService.main(loginDto))
    }
}