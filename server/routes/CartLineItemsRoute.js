import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import { ensureAdmin, ensureUser } from "../helpers/authJWT";

const router = Router();

router.get("/", ensureAdmin, IndexCtrl.CartLineItemsCtrl.findAllCartLineItems);
router.get(
  "/:id",
  ensureUser,
  IndexCtrl.CartLineItemsCtrl.findCartLineItemsByCartId
);

export default router;
