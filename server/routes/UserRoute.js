import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureAdmin } from "../helpers/authJWT";

const router = Router();

router.get("/", ensureAdmin, IndexCtrl.UserCtrl.findAllUser);

export default router;
