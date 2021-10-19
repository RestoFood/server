import "dotenv/config";
import express from "express";
import cors from "cors";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import models, { sequelize } from "./models/indexModel";
import routes from "./routes/IndexRoute";

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

/* app.use("/restofood",(req,res)=>{
    res.send("Hello RestoFood")
}); */

// call routes
app.use(process.env.URL_API + "/user", routes.UserRoute);
app.use(process.env.URL_API + "/resto-shop", routes.RestoShopRoute);
app.use(process.env.URL_API + "/address", routes.AddressRoute);
app.use(process.env.URL_API + "/resto-ctgry", routes.RetoCtgryRoute);



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
