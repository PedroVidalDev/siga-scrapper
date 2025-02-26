import { LoginDTO } from "../dtos/Auth/LoginDTO";
import { ScraperService } from "./ScraperService";

export class SigaService {
    private scraperService: ScraperService;

    constructor() {
        this.scraperService = new ScraperService();
    }

    public async getSigaInfos(loginDto: LoginDTO): Promise<void> {
        await this.scraperService.main(loginDto)
    }
}