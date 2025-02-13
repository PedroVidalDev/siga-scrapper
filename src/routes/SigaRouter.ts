import { Request, Router } from "express";
import { SigaController } from "../controllers/SigaController";

const controller = new SigaController();

const router = Router();

router.get("/", () => {
    console.log("siga")
})

router.get("/absence", (req: Request, res: Response) => controller.getAbsencesInfo(req, res));

export default router;