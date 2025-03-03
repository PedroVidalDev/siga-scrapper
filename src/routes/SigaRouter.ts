import { Request, Response, Router } from "express";
import { SigaController } from "../controllers/SigaController";

const controller = new SigaController();

const router = Router();

router.post("/", (req: Request, res: Response) => controller.getSigaInfos(req, res));

export default router;