import Sequelize from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const DataTypes = require("sequelize").DataTypes;
const _account_payment = require("./account_payment");
const _address = require("./address");
const _bank = require("./bank");
const _bank_account = require("./bank_account");
const _cart_line_items = require("./cart_line_items");
const _carts = require("./carts");
const _menu_type = require("./menu_type");
const _order_menu = require("./order_menu");
const _payment_transaction = require("./payment_transaction");
const _resto_addon = require("./resto_addon");
const _resto_category = require("./resto_category");
const _resto_menu = require("./resto_menu");
const _resto_reviews = require("./resto_reviews");
const _resto_shop = require("./resto_shop");
const _users = require("./users");

const initModels = (sequelize) => {
  const account_payment = _account_payment(sequelize, DataTypes);
  const address = _address(sequelize, DataTypes);
  const bank = _bank(sequelize, DataTypes);
  const bank_account = _bank_account(sequelize, DataTypes);
  const cart_line_items = _cart_line_items(sequelize, DataTypes);
  const carts = _carts(sequelize, DataTypes);
  const menu_type = _menu_type(sequelize, DataTypes);
  const order_menu = _order_menu(sequelize, DataTypes);
  const payment_transaction = _payment_transaction(sequelize, DataTypes);
  const resto_addon = _resto_addon(sequelize, DataTypes);
  const resto_category = _resto_category(sequelize, DataTypes);
  const resto_menu = _resto_menu(sequelize, DataTypes);
  const resto_reviews = _resto_reviews(sequelize, DataTypes);
  const resto_shop = _resto_shop(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  payment_transaction.belongsTo(account_payment, {
    as: "payt_acc_number_account_payment",
    foreignKey: "payt_acc_number",
  });
  account_payment.hasMany(payment_transaction, {
    as: "payment_transactions",
    foreignKey: "payt_acc_number",
  });
  bank_account.belongsTo(bank, { as: "baac_bank", foreignKey: "baac_bank_id" });
  bank.hasMany(bank_account, {
    as: "bank_accounts",
    foreignKey: "baac_bank_id",
  });
  payment_transaction.belongsTo(bank_account, {
    as: "payt_baac_acc_bank_bank_account",
    foreignKey: "payt_baac_acc_bank",
  });
  bank_account.hasMany(payment_transaction, {
    as: "payment_transactions",
    foreignKey: "payt_baac_acc_bank",
  });
  cart_line_items.belongsTo(carts, {
    foreignKey: "clit_cart_id",
  });
  carts.hasMany(cart_line_items, {
    foreignKey: "clit_cart_id",
  });
  resto_menu.belongsTo(menu_type, {
    as: "reme_mety_name_menu_type",
    foreignKey: "reme_mety_name",
  });
  menu_type.hasMany(resto_menu, {
    as: "resto_menus",
    foreignKey: "reme_mety_name",
  });
  cart_line_items.belongsTo(order_menu, {
    foreignKey: "clit_order_name",
  });
  order_menu.hasMany(cart_line_items, {
    foreignKey: "clit_order_name",
  });
  payment_transaction.belongsTo(order_menu, {
    as: "payt_order_number_order_menu",
    foreignKey: "payt_order_number",
  });
  order_menu.hasMany(payment_transaction, {
    as: "payment_transactions",
    foreignKey: "payt_order_number",
  });
  cart_line_items.belongsTo(resto_addon, {
    as: "clit_redon",
    foreignKey: "clit_redon_id",
  });
  resto_addon.hasMany(cart_line_items, {
    as: "cart_line_items",
    foreignKey: "clit_redon_id",
  });
  resto_shop.belongsTo(resto_category, {
    as: "reto_resto_type_resto_category",
    foreignKey: "reto_resto_type",
  });
  resto_category.hasMany(resto_shop, {
    as: "resto_shops",
    foreignKey: "reto_resto_type",
  });
  cart_line_items.belongsTo(resto_menu, {
    as: "clit_reme",
    foreignKey: "clit_reme_id",
  });
  resto_menu.hasMany(cart_line_items, {
    as: "cart_line_items",
    foreignKey: "clit_reme_id",
  });
  resto_addon.belongsTo(resto_menu, {
    as: "redon_reme",
    foreignKey: "redon_reme_id",
  });
  resto_menu.hasMany(resto_addon, {
    as: "resto_addons",
    foreignKey: "redon_reme_id",
  });
  carts.belongsTo(resto_shop, { foreignKey: "cart_reto_id" });
  resto_shop.hasMany(carts, { foreignKey: "cart_reto_id" });
  resto_menu.belongsTo(resto_shop, {
    as: "reme_reto",
    foreignKey: "reme_reto_id",
  });
  resto_shop.hasMany(resto_menu, {
    as: "resto_menus",
    foreignKey: "reme_reto_id",
  });
  resto_reviews.belongsTo(resto_shop, {
    as: "rere_reto",
    foreignKey: "rere_reto_id",
  });
  resto_shop.hasMany(resto_reviews, {
    as: "resto_reviews",
    foreignKey: "rere_reto_id",
  });
  account_payment.belongsTo(users, {
    as: "acc_user",
    foreignKey: "acc_user_id",
  });
  users.hasMany(account_payment, {
    as: "account_payments",
    foreignKey: "acc_user_id",
  });
  address.belongsTo(users, { as: "addr_user", foreignKey: "addr_user_id" });
  users.hasMany(address, { as: "addresses", foreignKey: "addr_user_id" });
  bank_account.belongsTo(users, {
    as: "baac_user",
    foreignKey: "baac_user_id",
  });
  users.hasMany(bank_account, {
    as: "bank_accounts",
    foreignKey: "baac_user_id",
  });
  carts.belongsTo(users, { as: "cart_user", foreignKey: "cart_user_id" });
  users.hasMany(carts, { as: "carts", foreignKey: "cart_user_id" });
  order_menu.belongsTo(users, {
    as: "order_user",
    foreignKey: "order_user_id",
  });
  users.hasMany(order_menu, { as: "order_menus", foreignKey: "order_user_id" });
  resto_reviews.belongsTo(users, {
    as: "rere_user",
    foreignKey: "rere_user_id",
  });
  users.hasMany(resto_reviews, {
    as: "resto_reviews",
    foreignKey: "rere_user_id",
  });
  resto_shop.belongsTo(users, { foreignKey: "reto_user_id" });
  users.hasMany(resto_shop, { foreignKey: "reto_user_id" });

  return {
    account_payment,
    address,
    bank,
    bank_account,
    cart_line_items,
    carts,
    menu_type,
    order_menu,
    payment_transaction,
    resto_addon,
    resto_category,
    resto_menu,
    resto_reviews,
    resto_shop,
    users,
  };
};

const models = initModels(sequelize);
export default models;
export { sequelize };

/* module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels; */
