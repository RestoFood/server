import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import {
  ensureAdmin,
  ensureUserOrSeller,
  ensureUser,
} from "../helpers/authJWT";

const router = Router();

router.get("/", ensureAdmin, IndexCtrl.PaymentTxnCtrl.findAllPayt);
router.get("/:id", ensureUserOrSeller, IndexCtrl.PaymentTxnCtrl.findPaytByPk);

router.post(
  "/topup",
  ensureUser,
  IndexCtrl.BankAccountCtrl.checkPinBank,
  IndexCtrl.BankAccountCtrl.checkSaldoBank,
  IndexCtrl.PaymentTxnCtrl.jurnalTopup,
  IndexCtrl.AccountPaymentCtrl.updateSaldoAcc,
  IndexCtrl.BankAccountCtrl.updateSaldoBank
);
router.post(
  "/tarikuang",
  ensureUserOrSeller,
  IndexCtrl.AccountPaymentCtrl.checkPinAcc,
  IndexCtrl.AccountPaymentCtrl.checkSaldoAcc,
  IndexCtrl.PaymentTxnCtrl.jurnalTarikUang,
  IndexCtrl.AccountPaymentCtrl.updateSaldoAcc,
  IndexCtrl.BankAccountCtrl.updateSaldoBank
);

router.post(
  "/payorder",
  ensureUser,
  IndexCtrl.AccountPaymentCtrl.checkPinAcc,
  IndexCtrl.OrderMenuCtrl.checkOrder,
  IndexCtrl.AccountPaymentCtrl.checkSaldoAcc,
  IndexCtrl.PaymentTxnCtrl.jurnalOrder,
  IndexCtrl.AccountPaymentCtrl.updateSaldoAcc,
  IndexCtrl.OrderMenuCtrl.updateOrderPayt
);

router.post(
  "/cancelorder",
  ensureUser,
  IndexCtrl.OrderMenuCtrl.checkOrder,
  IndexCtrl.PaymentTxnCtrl.jurnalRefund,
  IndexCtrl.AccountPaymentCtrl.updateSaldoAcc,
  IndexCtrl.OrderMenuCtrl.updateOrderPayt
);

router.post(
  "/closeorder",
  ensureUser,
  IndexCtrl.OrderMenuCtrl.checkOrder,
  IndexCtrl.OrderMenuCtrl.accRestoFromOrder,
  IndexCtrl.PaymentTxnCtrl.jurnalClose,
  IndexCtrl.AccountPaymentCtrl.updateSaldoAcc,
  IndexCtrl.OrderMenuCtrl.updateOrderPayt
)

export default router;
