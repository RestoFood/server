import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureUserOrSeller } from "../helpers/authJWT";

const router = Router();

router.get("/", IndexCtrl.BankAccountCtrl.findAllBaac);
router.get("/:id", IndexCtrl.BankAccountCtrl.findBaacByPk);

// method post
router.post("/", ensureUserOrSeller, IndexCtrl.BankAccountCtrl.createBaac);
// put
router.put("/:id", ensureUserOrSeller, IndexCtrl.BankAccountCtrl.updateBaac);
router.put(
  "/addsaldo/:id",
  ensureUserOrSeller,
  IndexCtrl.BankAccountCtrl.findBaacByPk,
  IndexCtrl.BankAccountCtrl.addSaldo
);
// delete
router.delete("/:id", ensureUserOrSeller, IndexCtrl.BankAccountCtrl.deleteBaac);

export default router;
