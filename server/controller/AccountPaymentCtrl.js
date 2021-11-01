const createAcc = async (req, res) => {
  try {
    const result = await req.context.models.account_payment.create({
      acc_saldo: 0,
      acc_pin_number: req.pin,
      acc_total_point: 0,
      acc_user_id: req.user.user_id,
    });

    //only for display postman
    const resultAll = {
      ...req.user,
      account_payment: { ...result.dataValues },
    };
    return res.send(resultAll);
  } catch (error) {
    return res.send("unable to create acc_pay");
  }
};

const findAllAcc = async (req, res) => {
  try {
    const result = await req.context.models.account_payment.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findAccountPaymentByUserId = async (req, res) => {
  const { userId } = req.user;
  try {
    const result = await req.context.models.account_payment.findOne({
      where: { acc_user_id: userId },
    });

    return res.send(result);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

const findAccByPk = async (req, res) => {
  try {
    const result = await req.context.models.account_payment.findByPk(
      req.params.id
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const updateAcc = async (req, res) => {
  const { acc_pin_number } = req.body;
  const id = req.params.id;
  const { userId } = req.user;
  try {
    const result = await req.context.models.account_payment.update(
      {
        acc_pin_number: acc_pin_number,
      },
      { returning: true, where: { acc_number: id, acc_user_id: userId } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const updateSaldoAcc = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const { userId } = req.user;

    if (req.payt.payt_type === "topup") {
      await req.context.models.account_payment.update(
        {
          acc_saldo: parseFloat(req.acc.acc_saldo) + amount,
        },
        { returning: true, where: { acc_user_id: userId } }
      );
      return next();
    }

    if (req.payt.payt_type === "transfer") {
      if (req.accResto) {
        await req.context.models.account_payment.update(
          {
            acc_saldo: parseFloat(req.accResto.acc_saldo) + parseFloat(req.order.order_total_price),
          },
          { returning: true, where: { acc_number: req.accResto.acc_number } }
        );
        return next();
      }

      await req.context.models.account_payment.update(
        {
          acc_saldo: parseFloat(req.acc.acc_saldo) - amount,
        },
        { returning: true, where: { acc_user_id: userId } }
      );
      return next();
    }

    if (req.payt.payt_type === "order") {
      await req.context.models.account_payment.update(
        {
          acc_saldo:
            parseFloat(req.acc.acc_saldo) -
            parseFloat(req.order.order_total_price),
        },
        { returning: true, where: { acc_user_id: userId } }
      );
      return next();
    }

    if (req.payt.payt_type === "refund") {
      await req.context.models.account_payment.update(
        {
          acc_saldo:
            parseFloat(req.acc.acc_saldo) +
            parseFloat(req.order.order_total_price),
        },
        { returning: true, where: { acc_user_id: userId } }
      );
      return next();
    }

    return res.sendStatus(400);
  } catch (error) {
    return res.send(error);
  }
};

const checkPinAcc = async (req, res, next) => {
  try {
    const { pinAcc } = req.body;
    const { userId } = req.user;
    const resultAcc = await req.context.models.account_payment.findOne({
      where: { acc_user_id: userId },
    });

    if (!resultAcc) return res.sendStatus(404);
    if (!(resultAcc.dataValues.acc_pin_number === pinAcc))
      return res.sendStatus(401);

    req.acc = resultAcc.dataValues;
    return next();
  } catch (error) {
    return res.send(error);
  }
};

const checkSaldoAcc = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const saldoAcc = parseFloat(req.acc.acc_saldo);

    //for order
    if (req.order) {
      if (!(saldoAcc >= parseFloat(req.order.order_total_price)))
        return res.sendStatus(400);
      return next();
    }

    //for tarikuang
    if (!(saldoAcc >= amount)) return res.sendStatus(400);
    return next();
  } catch (error) {
    return res.send(error);
  }
};

export default {
  createAcc,
  findAllAcc,
  findAccByPk,
  findAccountPaymentByUserId,
  updateAcc,
  updateSaldoAcc,
  checkPinAcc,
  checkSaldoAcc,
};
