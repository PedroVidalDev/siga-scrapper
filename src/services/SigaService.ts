import { LoginDTO } from "../dtos/Auth/LoginDTO";
import { ScraperService } from "./ScraperService";

export class SigaService {
    private scraperService: ScraperService;

    constructor() {
        this.scraperService = new ScraperService();
    }

    public async getAbsencesInfo(loginDto: LoginDTO) {
        this.scraperService.getAbsencesInfo(loginDto);
    }
}