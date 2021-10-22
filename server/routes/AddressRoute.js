import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/",IndexCtrl.AddressCtrl.findAddrAll);
router.get("/:id",IndexCtrl.AddressCtrl.findAddrByPk);

// method post
router.post("/",IndexCtrl.AddressCtrl.createAddr);
// put
router.put("/:id",IndexCtrl.AddressCtrl.updateAddr);
// delete
router.delete("/:id",IndexCtrl.AddressCtrl.deleteAddr);

export default router;