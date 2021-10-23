import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/", IndexCtrl.AccountPaymentCtrl.findAllAcc);
router.get("/:id", IndexCtrl.AccountPaymentCtrl.findAccByPk);

// put
router.put("/:id", IndexCtrl.AccountPaymentCtrl.updateAcc);

export default router;