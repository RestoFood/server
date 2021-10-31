import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureUser } from "../helpers/authJWT";

const router = Router();

router.put(
  "/",
  ensureUser,
  IndexCtrl.CheckoutCtrl.updateItems,
  IndexCtrl.CheckoutCtrl.updateStatus
);

export default router;
