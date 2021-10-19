import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/", IndexCtrl.RestoShopCtrl.getAllShop);
router.get("/:id", IndexCtrl.RestoShopCtrl.getShopById);

router.post("/", IndexCtrl.RestoShopCtrl.createShop);
router.put("/:id", IndexCtrl.RestoShopCtrl.updateShop);
router.delete("/:id", IndexCtrl.RestoShopCtrl.deleteShop);

export default router;
