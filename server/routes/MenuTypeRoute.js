import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/", IndexCtrl.MenuTypeCtrl.findAllMenuType);
router.post("/", IndexCtrl.MenuTypeCtrl.createMenuType);

export default router;
