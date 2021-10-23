import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.post("/addtocart", IndexCtrl.CartCtrl.addToCart);

export default router;
