import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/",IndexCtrl.AddressCtrl.findAddrAll);
router.get("/:id",IndexCtrl.AddressCtrl.findAddrByPk);


router.post("/",IndexCtrl.AddressCtrl.createAddr);

router.put("/:id",IndexCtrl.AddressCtrl.updateAddr);

router.delete("/:id",IndexCtrl.AddressCtrl.deleteAddr);

export default router;

