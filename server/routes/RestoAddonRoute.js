import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/",IndexCtrl.RestoAddonCtrl.findAllRedon);
router.get("/:id",IndexCtrl.RestoAddonCtrl.findRedonById);

router.post("/",IndexCtrl.RestoAddonCtrl.createRedon);

router.put("/:id",IndexCtrl.RestoAddonCtrl.updateRedon);

router.delete("/:id",IndexCtrl.RestoAddonCtrl.deleteRedon);

export default router;