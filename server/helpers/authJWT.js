const jwt = require("jsonwebtoken");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;

import bcrypt from "bcrypt";

const jwtSecret = process.env.JWT_SECRET || "myjwt";
const adminPassword = process.env.ADMIN_PASSWORD || "secret";
const jwtOpts = { algorithm: "HS256", expiresIn: "30d" };
import models from "../models/indexModel";

passport.use(adminStrategy());
const authenticate = passport.authenticate("local", { session: false });

async function login(req, res, next) {
  const token = await sign({
    userId: req.user.userId,
    username: req.user.username,
    roleType: req.user.roleType,
  });
  const { userId, username, email, roleType } = req.user;
  res.cookie("jwt", token, { httpOnly: true });

  res.json({
    profile: { userId, username, email, roleType },
    success: true,
    token: token,
  });
}

async function sign(payload) {
  const token = await jwt.sign(payload, jwtSecret, jwtOpts);
  return token;
}

async function ensureSeller(req, res, next) {
  // req.cookies.jwt
  try {
    const jwtString = req.headers.authorization || "";
    const payload = await verify(jwtString);
    if (payload.roleType === "seller") {
      req.user = payload;
      return next();
    }
  } catch (error) {
    return res.sendStatus(401);
  }
}

async function ensureAdmin(req, res, next) {
  // req.cookies.jwt
  try {
    const jwtString = req.headers.authorization || "";
    const payload = await verify(jwtString);
    if (payload.roleType === "admin") {
      req.user = payload;
      return next();
    }
  } catch (error) {
    return res.sendStatus(401);
  }
}

async function ensureUser(req, res, next) {
  // req.cookies.jwt
  try {
    const jwtString = req.headers.authorization || "";
    const payload = await verify(jwtString);
    if (payload.roleType === "user") {
      req.user = payload;
      return next();
    }
  } catch (error) {
    return res.sendStatus(401);
  }
}

async function ensureUserOrSeller(req, res, next) {
  // req.cookies.jwt
  try {
    const jwtString = req.headers.authorization || "";
    const payload = await verify(jwtString);
    if (payload.roleType === "user" || payload.roleType === "seller") {
      req.user = payload;
      return next();
    }
  } catch (error) {
    return res.sendStatus(401);
  }
}

async function verify(jwtString = "") {
  jwtString = jwtString.replace(/^Bearer /i, "");
  try {
    const payload = await jwt.verify(jwtString, jwtSecret);
    return payload;
  } catch (err) {
    err.statusCode = 401;
    throw err;
  }
}

function adminStrategy() {
  return new Strategy(async function (username, password, cb) {
    try {
      const result = await models.users.findOne({
        where: { user_name: username },
      });
      console.log(result);
      const { user_name, user_id, user_password, user_email, user_roles } =
        result.dataValues;
      const compare = await bcrypt.compare(password, user_password);

      if (compare)
        return cb(null, {
          username: user_name,
          userId: user_id,
          email: user_email,
          roleType: user_roles,
        });
    } catch (error) {
      console.log(error);
    }

    cb(null, false);
  });
}

module.exports = {
  authenticate,
  login: login,
  ensureAdmin: ensureAdmin,
  ensureSeller: ensureSeller,
  ensureUser: ensureUser,
  ensureUserOrSeller: ensureUserOrSeller,
};
