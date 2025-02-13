import SigaRouter from "./SigaRouter";
import Router, { Request, Response } from "express";

const router = Router();

router.use("/health", (req: Request, res: Response) => {
    res.status(200).send("Sharingan");
})

router.use("/siga", SigaRouter);

export default router;