import { Request, Response } from "express";
import { LoginDTO } from "../dtos/Auth/LoginDTO";
import { SigaService } from "../services/SigaService";
import { ScraperService } from "../services/ScraperService";

export class SigaController {
    private service: SigaService;

    constructor() {
        this.service = new SigaService(new ScraperService());
    }

    public async getSigaInfos(req: Request, res: Response) {
        const { username, password } = req.body;

        const data = await this.service.getSigaInfos(new LoginDTO(username, password));

        res.status(200).json(data)
    }

}