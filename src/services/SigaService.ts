import { AbsenceDTO } from "../dtos/Absences/AbsenceDTO";
import { LoginDTO } from "../dtos/Auth/LoginDTO";
import { ScraperService } from "./ScraperService";

export class SigaService {
    private scraperService: ScraperService;

    constructor() {
        this.scraperService = new ScraperService();
    }

    public async getAbsencesInfo(loginDto: LoginDTO): Promise<AbsenceDTO[]> {
        const absencesList: AbsenceDTO[] | undefined = await this.scraperService.getAbsencesInfo(loginDto);
        await this.scraperService.closePage();
        
        if(absencesList) {
            return absencesList;
        } else {
            throw new Error("Erro ao pegar informações.");
        }
    }
}