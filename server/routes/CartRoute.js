import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureUser } from "../helpers/authJWT";
const router = Router();

router.post("/addtocart", ensureUser, IndexCtrl.CartCtrl.addToCart);

export default router;
