import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureAdmin, ensureUser } from "../helpers/authJWT";


const router = Router();

router.get("/", ensureAdmin, IndexCtrl.RestoCtgryCtrl.findReCaAll);
router.get("/:id",ensureAdmin, IndexCtrl.RestoCtgryCtrl.findReCaByPk);

// method post
router.post("/",ensureUser, IndexCtrl.RestoCtgryCtrl.createReCa);
// put
router.put("/:id",ensureUser, IndexCtrl.RestoCtgryCtrl.updateReCa);
// delete
router.delete("/:id",ensureUser, IndexCtrl.RestoCtgryCtrl.deleteReCa);

export default router;

