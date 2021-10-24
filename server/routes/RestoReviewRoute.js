import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureUser } from "../helpers/authJWT";

const router = Router();

router.get("/",IndexCtrl.RestoReviewCtrl.findAllRere);
router.get("/:id",IndexCtrl.RestoReviewCtrl.findRereById);

router.post("/",ensureUser, IndexCtrl.RestoReviewCtrl.createRere);

router.put("/:id",ensureUser, IndexCtrl.RestoReviewCtrl.updateRere);

router.delete("/:id",ensureUser, IndexCtrl.RestoReviewCtrl.deleteRere);

export default router;