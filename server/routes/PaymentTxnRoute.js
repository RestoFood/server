import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureAdmin, ensureUserOrSeller, ensureUser } from "../helpers/authJWT";

const router = Router();

router.get("/", ensureAdmin, IndexCtrl.PaymentTxnCtrl.findAllPayt);
router.get("/:id", ensureUserOrSeller, IndexCtrl.PaymentTxnCtrl.findPaytByPk);

router.post(
  "/topup",
  ensureUser,
  IndexCtrl.PaymentTxnCtrl.checkBank,
  IndexCtrl.PaymentTxnCtrl.topUp
);
router.post(
  "/tarikuang",
  ensureUserOrSeller,
  IndexCtrl.PaymentTxnCtrl.checkAcc,
  IndexCtrl.PaymentTxnCtrl.tarikUang
);

export default router;
