import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import UpDownloadHelper from "../helpers/UpDownloadHelper";

const router = Router();

router.get("/",IndexCtrl.RestoMenuCtrl.findAllReme);
router.get("/:id",IndexCtrl.RestoMenuCtrl.findRemeById);
router.get("/images/:filename", UpDownloadHelper.showRemeImage);

router.post("/",IndexCtrl.RestoMenuCtrl.createReme);

router.put("/:id",IndexCtrl.RestoMenuCtrl.updateReme);

router.delete("/:id",IndexCtrl.RestoMenuCtrl.deleteReme);

export default router;