import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureAdmin } from "../helpers/authJWT";

const router = Router();

router.get("/", IndexCtrl.RestoCtgryCtrl.findReCaAll);
router.get("/:id", IndexCtrl.RestoCtgryCtrl.findReCaByPk);

// method post
router.post("/", ensureAdmin, IndexCtrl.RestoCtgryCtrl.createReCa);
// put
router.put("/:id", ensureAdmin, IndexCtrl.RestoCtgryCtrl.updateReCa);
// delete
router.delete("/:id", ensureAdmin, IndexCtrl.RestoCtgryCtrl.deleteReCa);

export default router;
