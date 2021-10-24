import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/", IndexCtrl.PaymentTxnCtrl.findAllPayt);
router.get("/:id", IndexCtrl.PaymentTxnCtrl.findPaytByPk);

router.post(
  "/topup",
  IndexCtrl.PaymentTxnCtrl.checkPinBank,
  IndexCtrl.PaymentTxnCtrl.topUp
);
router.post(
  "/tarikuang",
  IndexCtrl.PaymentTxnCtrl.checkPinAcc,
  IndexCtrl.PaymentTxnCtrl.tarikUang
);

export default router;
