//auth
import UserRoute from "./UserRoute";

//user
import AuthRoute from "./AuthRoute";
import AddressRoute from "./AddressRoute";

//resto
import RestoShopRoute from "./RestoShopRoute";
import RestoMenuRoute from "./RestoMenuRoute";
import MenuTypeRoute from "./MenuTypeRoute";
import RestoAddonRoute from "./RestoAddonRoute";
import RestoReviewRoute from "./RestoReviewRoute";
import RestoCtgryRoute from "./RestoCtgryRoute";

//payment
import BankRoute from "./BankRoute";
import BankAccountRoute from "./BankAccountRoute";
import AccountPaymentRoute from "./AccountPaymentRoute";
import PaymentTxnRoute from "./PaymentTxnRoute";

//cart
import CartRoute from "./CartRoute";
import CartLineItemsRoute from "./CartLineItemsRoute";

import CheckoutRoute from "./CheckoutRoute";

export default {
  //user
  AuthRoute,
  UserRoute,
  AddressRoute,

  //resto
  RestoShopRoute,
  RestoMenuRoute,
  MenuTypeRoute,
  RestoAddonRoute,
  RestoReviewRoute,
  RestoCtgryRoute,

  //payment
  BankRoute,
  BankAccountRoute,
  AccountPaymentRoute,
  PaymentTxnRoute,
  CheckoutRoute,

  //cart
  CartRoute,
  CartLineItemsRoute,
};
