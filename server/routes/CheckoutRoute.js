import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureAdmin, ensureUser } from "../helpers/authJWT";

const router = Router();

router.post(
  "/checkout",
  ensureUser,
  IndexCtrl.CheckoutCtrl.updateItems,
  IndexCtrl.CheckoutCtrl.updateStatus
);

export default router;
