import "dotenv/config";
import express from "express";
import cors from "cors";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import middleware from "./helpers/middleware";

import models, { sequelize } from "./models/indexModel";
import routes from "./routes/IndexRoute";
import authJWT from "./helpers/authJWT";

// declare port
const port = process.env.PORT || 1337;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compress());
app.use(cors());

app.use(async (req, res, next) => {
  req.context = { models };
  next();
});

// call routes
// auth
app.use(process.env.URL_DOMAIN + "/auth", routes.AuthRoute);

//user
app.use(process.env.URL_API + "/user", routes.UserRoute);
app.use(process.env.URL_API + "/address", routes.AddressRoute);

//resto routes
app.use(process.env.URL_API + "/resto-shop", routes.RestoShopRoute);
app.use(process.env.URL_API + "/restomenu", routes.RestoMenuRoute);
app.use(process.env.URL_API + "/menutype", routes.MenuTypeRoute);
app.use(process.env.URL_API + "/restoaddon", routes.RestoAddonRoute);
app.use(process.env.URL_API + "/restoreview", routes.RestoReviewRoute);

app.use(process.env.URL_API + "/restoctgry", routes.RestoCtgryRoute);

//cart
app.use(process.env.URL_API + "/cart", routes.CartRoute);

//payment
app.use(process.env.URL_API + "/bank", routes.BankRoute);
app.use(process.env.URL_API + "/bankacc", routes.BankAccountRoute);
app.use(process.env.URL_API + "/accpay", routes.AccountPaymentRoute);
app.use(process.env.URL_API + "/payt", routes.PaymentTxnRoute);

app.use(middleware.handleError);
app.use(middleware.notFound);

const dropDatabaseSync = false;

sequelize.sync({ force: dropDatabaseSync }).then(async () => {
  if (dropDatabaseSync) {
    console.log("Database do not drop table");
  }

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});

export default app;
