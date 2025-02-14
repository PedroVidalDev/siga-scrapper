import { Request, Response, Router } from "express";
import { SigaController } from "../controllers/SigaController";

const controller = new SigaController();

const router = Router();

router.get("/", () => {
    console.log("siga")
})

router.get("/absences", (req: Request, res: Response) => controller.getAbsencesInfo(req, res));
router.get("/classtimes", (req: Request, res: Response) => controller.getClasstimes(req, res));

export default router;