import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureAdmin, ensureSeller } from "../helpers/authJWT";


const router = Router();

router.get("/",ensureAdmin,IndexCtrl.RestoShopCtrl.getAllShop);
router.get("/:id",ensureAdmin, IndexCtrl.RestoShopCtrl.getShopById);

router.post("/", ensureSeller, IndexCtrl.RestoShopCtrl.createShop);
router.put("/:id",ensureSeller, IndexCtrl.RestoShopCtrl.updateShop);
router.delete("/:id", ensureSeller, IndexCtrl.RestoShopCtrl.deleteShop);

export default router;
