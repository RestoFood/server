import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureSeller } from "../helpers/authJWT";


const router = Router();

router.get("/", IndexCtrl.RestoShopCtrl.getAllShop);
router.get("/:id", IndexCtrl.RestoShopCtrl.getShopById);

router.post("/", ensureSeller, IndexCtrl.RestoShopCtrl.createShop);
router.put("/:id", ensureSeller, IndexCtrl.RestoShopCtrl.updateShop);
router.delete("/:id", ensureSeller, IndexCtrl.RestoShopCtrl.deleteShop);

export default router;
