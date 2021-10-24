import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureAdmin, ensureUserOrSeller } from "../helpers/authJWT";

const router = Router();

router.get("/", ensureAdmin, IndexCtrl.AddressCtrl.findAddrAll);
router.get("/:id", ensureAdmin, IndexCtrl.AddressCtrl.findAddrByPk);

router.post("/", ensureUserOrSeller, IndexCtrl.AddressCtrl.createAddr);

router.put("/:id", ensureUserOrSeller, IndexCtrl.AddressCtrl.updateAddr);

router.delete("/:id", ensureUserOrSeller, IndexCtrl.AddressCtrl.deleteAddr);

export default router;
