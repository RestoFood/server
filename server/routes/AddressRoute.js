import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureUser } from "../helpers/authJWT";

const router = Router();

router.get("/", IndexCtrl.AddressCtrl.findAddrAll);
router.get("/:id", IndexCtrl.AddressCtrl.findAddrByPk);

router.post("/", ensureUser, IndexCtrl.AddressCtrl.createAddr);

router.put("/:id", IndexCtrl.AddressCtrl.updateAddr);

router.delete("/:id", IndexCtrl.AddressCtrl.deleteAddr);

export default router;
