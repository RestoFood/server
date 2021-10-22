import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();


router.get("/",IndexCtrl.RetoCtgryCtrl.findReCaAll);
router.get("/:id",IndexCtrl.RetoCtgryCtrl.findReCaByPk);


router.post("/",IndexCtrl.RetoCtgryCtrl.createReCa);

router.put("/:id",IndexCtrl.RetoCtgryCtrl.updateReCa);

router.delete("/:id",IndexCtrl.RetoCtgryCtrl.deleteReCa);

export default router;