import { Router } from "express";
import authJWT from "../helpers/authJWT";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/get",IndexCtrl.UserCtrl.findAllUser)

router.post("/signin",authJWT.authenticate,authJWT.login);

router.post("/signup", IndexCtrl.UserCtrl.signup,IndexCtrl.AccountPaymentCtrl.createAcc)

export default router;