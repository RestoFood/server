import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/", IndexCtrl.BankAccountCtrl.findAllBaac);
router.get("/:id", IndexCtrl.BankAccountCtrl.findBaacByPk);

// method post
router.post("/", IndexCtrl.BankAccountCtrl.createBaac);
// put
router.put("/:id", IndexCtrl.BankAccountCtrl.updateBaac);
router.put(
  "/addsaldo/:id",
  IndexCtrl.BankAccountCtrl.findBaacByPk,
  IndexCtrl.BankAccountCtrl.addSaldo
);
// delete
router.delete("/:id", IndexCtrl.BankAccountCtrl.deleteBaac);

export default router;
