import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureAdmin, ensureUser } from "../helpers/authJWT";

const router = Router();

router.get("/", ensureAdmin, IndexCtrl.CartCtrl.findAllCart);
router.get("/getcart", ensureUser, IndexCtrl.CartCtrl.findCartByUserId);
router.post("/addtocart", ensureUser, IndexCtrl.CartCtrl.addToCart);

export default router;
