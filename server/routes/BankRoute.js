import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/", IndexCtrl.BankCtrl.findAllBank);
router.get("/:id", IndexCtrl.BankCtrl.findBankByPk);

// method post
router.post("/", IndexCtrl.BankCtrl.createBank);
// put
router.put("/:id", IndexCtrl.BankCtrl.updateBank);
// delete
router.delete("/:id", IndexCtrl.BankCtrl.deleteBank);

export default router;
