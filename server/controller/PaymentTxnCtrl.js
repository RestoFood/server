const findAllPayt = async (req, res) => {
  try {
    const result = await req.context.models.payment_transaction.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findPaytByPk = async (req, res) => {
  try {
    const result = await req.context.models.payment_transaction.findByPk(
      req.params.id
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const jurnalTopup = async (req, res, next) => {
  try {
    const { accBank, amount, desc } = req.body;
    const { userId } = req.user;
    const resultAcc = await req.context.models.account_payment.findOne({
      where: { acc_user_id: userId },
    });
    if (!resultAcc) return res.sendStatus(403);
    const result = await req.context.models.payment_transaction.create({
      payt_baac_acc_bank: accBank,
      payt_debit: amount,
      payt_credit: 0,
      payt_desc: desc,
      payt_type: "topup",
      payt_acc_number: resultAcc.dataValues.acc_number,
    });

    req.payt = result.dataValues;
    req.acc = resultAcc.dataValues;
    return next();
  } catch (error) {
    return res.send(error);
  }
};

const jurnalTarikUang = async (req, res, next) => {
  try {
    const { accBank, amount, desc } = req.body;
    const resultBaac = await req.context.models.bank_account.findByPk(accBank);
    if (!resultBaac) return res.sendStatus(404);
    const result = await req.context.models.payment_transaction.create({
      payt_baac_acc_bank: accBank,
      payt_debit: 0,
      payt_credit: amount,
      payt_desc: desc,
      payt_type: "transfer",
      payt_acc_number: req.acc.acc_number,
    });

    req.payt = result.dataValues;
    req.baac = resultBaac.dataValues;
    return next();
  } catch (error) {
    return res.send(error);
  }
};

const jurnalOrder = async (req, res, next) => {
  try {
    const { orderName, desc } = req.body;
    const result = await req.context.models.payment_transaction.create({
      payt_order_number: orderName,
      payt_debit: 0,
      payt_credit: parseFloat(req.order.order_total_price),
      payt_desc: desc,
      payt_type: "order",
      payt_acc_number: req.acc.acc_number,
    });
    req.payt = result.dataValues;
    return next();
  } catch (error) {
    return res.send(error);
  }
};

const jurnalRefund = async (req, res, next) => {
  try {
    const { orderName, desc } = req.body;
    const { userId } = req.user;
    const resultPayt = await req.context.models.payment_transaction.findOne({
      where: { payt_trx_number: req.order.order_payment_trx },
    });
    const resultAcc = await req.context.models.account_payment.findOne({
      where: { acc_user_id: userId },
    });

    if (!(resultPayt && resultAcc)) return res.sendStatus(404);
    if (!(req.order.order_status === "deliver")) return res.sendStatus(401);

    const result = await req.context.models.payment_transaction.create({
      payt_order_number: orderName,
      payt_trx_number_ref: req.order.order_payment_trx,
      payt_debit: parseFloat(req.order.order_total_price),
      payt_credit: 0,
      payt_desc: desc,
      payt_type: "refund",
      payt_acc_number: resultAcc.dataValues.acc_number,
    });

    req.acc = resultAcc.dataValues;
    req.payt = result.dataValues;
    return next();
  } catch (error) {
    return res.send(error);
  }
};

const jurnalClose = async (req, res, next) => {
  try {
    const { orderName } = req.body;
    if (!(req.order.order_status === "deliver")) return res.sendStatus(401);

    const result = await req.context.models.payment_transaction.create({
      payt_order_number: orderName,
      payt_trx_number_ref: req.order.order_payment_trx,
      payt_debit: parseFloat(req.order.order_total_price),
      payt_credit: 0,
      payt_type: "transfer",
      payt_acc_number: req.accResto.acc_number,
    });

    req.payt = result.dataValues;
    return next();
  } catch (error) {
    return res.send(error);
  }
};

export default {
  findAllPayt,
  findPaytByPk,
  jurnalTopup,
  jurnalTarikUang,
  jurnalOrder,
  jurnalRefund,
  jurnalClose,
};
