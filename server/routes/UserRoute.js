import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/", IndexCtrl.UserCtrl.findAllUser);

export default router;
