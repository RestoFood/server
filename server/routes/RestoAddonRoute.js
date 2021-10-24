import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureAdmin, ensureSeller } from "../helpers/authJWT";


const router = Router();

router.get("/", ensureAdmin, IndexCtrl.RestoAddonCtrl.findAllRedon);
router.get("/:id", ensureAdmin, IndexCtrl.RestoAddonCtrl.findRedonById);

router.post("/", ensureSeller, IndexCtrl.RestoAddonCtrl.createRedon);

router.put("/:id", ensureSeller, IndexCtrl.RestoAddonCtrl.updateRedon);

router.delete("/:id", ensureSeller, IndexCtrl.RestoAddonCtrl.deleteRedon);

export default router;
