import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureAdmin, ensureUser } from "../helpers/authJWT";
const router = Router();

router.get("/", ensureAdmin, IndexCtrl.AccountPaymentCtrl.findAllAcc);
router.get(
  "/useraccount",
  ensureUser,
  IndexCtrl.AccountPaymentCtrl.findAccountPaymentByUserId
);
router.get("/:id", ensureAdmin, IndexCtrl.AccountPaymentCtrl.findAccByPk);

// put
router.put("/:id", ensureUser, IndexCtrl.AccountPaymentCtrl.updateAcc);

export default router;
