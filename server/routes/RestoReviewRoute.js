import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/",IndexCtrl.RestoReviewCtrl.findAllRere);
router.get("/:id",IndexCtrl.RestoReviewCtrl.findRereById);

router.post("/",IndexCtrl.RestoReviewCtrl.createRere);

router.put("/:id",IndexCtrl.RestoReviewCtrl.updateRere);

router.delete("/:id",IndexCtrl.RestoReviewCtrl.deleteRere);

export default router;