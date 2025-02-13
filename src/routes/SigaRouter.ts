import { Router } from "express";

const router = Router();

router.use("/", () => {
    console.log("siga")
})

export default router;