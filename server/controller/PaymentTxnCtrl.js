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

const checkPinBank = async (req, res, next) => {
  try {
    const { accBank, accPay, pinBank } = req.body;
    const resultBaac = await req.context.models.bank_account.findByPk(accBank);

    if (resultBaac.dataValues.baac_pin_number === pinBank) {
      const resultAcc = await req.context.models.account_payment.findByPk(
        accPay
      );
      req.acc = resultAcc.dataValues;
      req.baac = resultBaac.dataValues;
      return next();
    }
    return res.send("pin false");
  } catch (error) {
    return res.send(error);
  }
};

const topUp = async (req, res) => {
  try {
    const { accBank, accPay, amount, desc } = req.body;
    const result = await req.context.models.payment_transaction.create({
      payt_baac_acc_bank: accBank,
      payt_debit: amount,
      payt_credit: 0,
      payt_desc: desc,
      payt_type: "topup",
      payt_acc_number: accPay,
    });

    await req.context.models.account_payment.update(
      {
        acc_saldo: parseFloat(req.acc.acc_saldo) + amount,
      },
      { returning: true, where: { acc_number: accPay } }
    );
    await req.context.models.bank_account.update(
      {
        baac_saldo: parseFloat(req.baac.baac_saldo) - amount,
      },
      { returning: true, where: { baac_acc_bank: accBank } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const checkPinAcc = async (req, res, next) => {
  try {
    const { accPay, accBank, pinAcc } = req.body;
    const resultAcc = await req.context.models.account_payment.findByPk(accPay);

    if (resultAcc.dataValues.acc_pin_number === pinAcc) {
      const resultBaac = await req.context.models.bank_account.findByPk(
        accBank
      );
      req.baac = resultBaac.dataValues;
      req.acc = resultAcc.dataValues;
      return next();
    }
    return res.send("pin false");
  } catch (error) {
    return res.send(error);
  }
};

const tarikUang = async (req, res) => {
  try {
    const { accPay, accBank, amount, desc } = req.body;
    const result = await req.context.models.payment_transaction.create({
      payt_baac_acc_bank: accBank,
      payt_debit: 0,
      payt_credit: amount,
      payt_desc: desc,
      payt_type: "transfer",
      payt_acc_number: accPay,
    });

    await req.context.models.account_payment.update(
      {
        acc_saldo: parseFloat(req.acc.acc_saldo) - amount,
      },
      { returning: true, where: { acc_number: accPay } }
    );
    await req.context.models.bank_account.update(
      {
        baac_saldo: parseFloat(req.baac.baac_saldo) + amount,
      },
      { returning: true, where: { baac_acc_bank: accBank } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

export default {
  findAllPayt,
  findPaytByPk,
  checkPinBank,
  checkPinAcc,
  topUp,
  tarikUang,
};