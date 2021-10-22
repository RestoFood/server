import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();


router.get("/",IndexCtrl.RestoCtgryCtrl.findReCaAll);
router.get("/:id",IndexCtrl.RestoCtgryCtrl.findReCaByPk);


router.post("/",IndexCtrl.RestoCtgryCtrl.createReCa);

router.put("/:id",IndexCtrl.RestoCtgryCtrl.updateReCa);

router.delete("/:id",IndexCtrl.RestoCtgryCtrl.deleteReCa);

export default router;

