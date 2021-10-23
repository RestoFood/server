import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/", IndexCtrl.RestoCtgryCtrl.findReCaAll);
router.get("/:id", IndexCtrl.RestoCtgryCtrl.findReCaByPk);

// method post
router.post("/", IndexCtrl.RestoCtgryCtrl.createReCa);
// put
router.put("/:id", IndexCtrl.RestoCtgryCtrl.updateReCa);
// delete
router.delete("/:id", IndexCtrl.RestoCtgryCtrl.deleteReCa);

export default router;
