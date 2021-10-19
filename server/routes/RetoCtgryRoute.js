import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();


router.get("/",IndexCtrl.RetoCtgryCtrl.findReCaAll);
router.get("/:id",IndexCtrl.RetoCtgryCtrl.findReCaByPk);

// method post
router.post("/",IndexCtrl.RetoCtgryCtrl.createReCa);
// put
router.put("/:id",IndexCtrl.RetoCtgryCtrl.updateReCa);
// delete
router.delete("/:id",IndexCtrl.RetoCtgryCtrl.deleteReCa);

export default router;