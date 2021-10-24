import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureAdmin } from "../helpers/authJWT";

const router = Router();

router.get("/", IndexCtrl.MenuTypeCtrl.findAllMenuType);
router.post("/", ensureAdmin, IndexCtrl.MenuTypeCtrl.createMenuType);

export default router;
