import { Request, Response } from "express";
import { LoginDTO } from "../dtos/Auth/LoginDTO";
import { SigaService } from "../services/SigaService";
import { DayEnum } from "../enums/DayEnum";

export class SigaController {
    private service: SigaService;

    constructor() {
        this.service = new SigaService();
    }

    public async getAbsencesInfo(req: Request, res: Response) {
        const { username, password } = req.body;

        const data = await this.service.getAbsencesInfo(new LoginDTO(username, password));

        res.status(200).json(data)
    }

    public async getClasstimes(req: Request, res: Response) {
        const { username, password } = req.body;

        const data = await this.service.getClasstimeInfo(new LoginDTO(username, password), req.query.day as DayEnum);

        res.status(200).json(data)
    }

}