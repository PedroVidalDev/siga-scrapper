import { AbsencesDTO } from "../dtos/Absences/AbsencesDTO";
import { LoginDTO } from "../dtos/Auth/LoginDTO";
import { ScraperService } from "./ScraperService";

export class SigaService {
    private scraperService: ScraperService;

    constructor() {
        this.scraperService = new ScraperService();
    }

    public async getAbsencesInfo(loginDto: LoginDTO): Promise<AbsencesDTO[]> {
        const absencesList: AbsencesDTO[] | undefined = await this.scraperService.getAbsencesInfo(loginDto);

        if(absencesList) {
            return absencesList;
        } else {
            throw new Error("Erro ao pegar informações.");
        }
    }
}