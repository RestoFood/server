import { Router } from "express";
import authJWT from "../helpers/authJWT";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureAdmin } from "../helpers/authJWT";

const router = Router();

router.get("/get", ensureAdmin, IndexCtrl.UserCtrl.findAllUser);

router.post("/signin", authJWT.authenticate, authJWT.login);

router.post(
  "/signup",
  IndexCtrl.UserCtrl.signup,
  IndexCtrl.AccountPaymentCtrl.createAcc
);

export default router;
