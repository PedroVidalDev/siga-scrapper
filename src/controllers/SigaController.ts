import { Request, Response } from "express";
import { SigaService } from "../services/SigaService";
import { LoginDTO } from "../dtos/Auth/LoginDTO";

export class SigaController {
    private service: SigaService;

    constructor() {
        this.service = new SigaService();
    }

    public async getAbsencesInfo(req: Request, res: Response) {
        const { username, password } = req.body;

        this.service.getAbsencesInfo(new LoginDTO(username, password));

        res.status(200).send("foi")
    }

}