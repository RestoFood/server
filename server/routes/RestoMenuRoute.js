import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import UpDownloadHelper from "../helpers/UpDownloadHelper";
import { ensureSeller } from "../helpers/authJWT";


const router = Router();

router.get("/", IndexCtrl.RestoMenuCtrl.findAllReme);
router.get("/:id", IndexCtrl.RestoMenuCtrl.findRemeById);
router.get("/images/:filename", UpDownloadHelper.showRemeImage);

router.post("/", ensureSeller, IndexCtrl.RestoMenuCtrl.createReme);

router.put("/:id", ensureSeller, IndexCtrl.RestoMenuCtrl.updateReme);

router.delete("/:id", ensureSeller, IndexCtrl.RestoMenuCtrl.deleteReme);

export default router;
