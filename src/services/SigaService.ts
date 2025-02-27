import { LoginDTO } from "../dtos/Auth/LoginDTO";
import { SigaDTO } from "../dtos/Siga/SigaDTO";
import { ScraperService } from "./ScraperService";

export class SigaService {
    private scraperService: ScraperService;

    constructor(scraperService: ScraperService) {
        this.scraperService = scraperService;
    }

    public async getSigaInfos(loginDto: LoginDTO): Promise<void> {
        const sigaDto: SigaDTO = await this.scraperService.main(loginDto);
    }
}