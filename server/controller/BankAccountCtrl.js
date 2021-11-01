const findAllBaac = async (req, res) => {
  try {
    const result = await req.context.models.bank_account.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findBaacByPk = async (req, res, next) => {
  try {
    const result = await req.context.models.bank_account.findByPk(
      req.params.id
    );
    if (!req._body) return res.send(result);
    req.baac = result.dataValues;
    return next();
  } catch (error) {
    return res.send(error);
  }
};

const findBankAccountByUserId = async (req, res) => {
  const { userId } = req.user;
  try {
    const result = await req.context.models.bank_account.findAndCountAll({
      where: { baac_user_id: userId },
    });

    return res.send(result);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

const createBaac = async (req, res) => {
  const {
    baac_acc_bank,
    baac_owner,
    baac_saldo,
    baac_pin_number,
    baac_type,
    baac_bank_id,
  } = req.body;

  const { userId } = req.user;

  try {
    const result = await req.context.models.bank_account.create({
      baac_acc_bank: baac_acc_bank,
      baac_owner: baac_owner,
      baac_saldo: baac_saldo,
      baac_pin_number: baac_pin_number,
      baac_type: baac_type,
      baac_user_id: userId,
      baac_bank_id: baac_bank_id,
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const updateBaac = async (req, res) => {
  const { baac_pin_number } = req.body;
  const id = req.params.id;
  const { userId } = req.user;

  try {
    const result = await req.context.models.bank_account.update(
      {
        baac_pin_number: baac_pin_number,
      },
      { returning: true, where: { baac_acc_bank: id, baac_user_id: userId } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const addSaldo = async (req, res) => {
  const { saldo } = req.body;
  const { userId } = req.user;
  try {
    const result = await req.context.models.bank_account.update(
      {
        baac_saldo: parseFloat(req.baac.baac_saldo) + saldo,
      },
      {
        returning: true,
        where: { baac_acc_bank: req.baac.baac_acc_bank, baac_user_id: userId },
      }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const deleteBaac = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.user;
  try {
    const result = await req.context.models.bank_account.destroy({
      where: { baac_acc_bank: id, baac_user_id: userId },
    });
    return res.send(result + " row deleted.");
  } catch (error) {
    return res.sendStatus(404).send("Data not found.");
  }
};

const checkPinBank = async (req, res, next) => {
  try {
    const { accBank, pinBank } = req.body;
    const { userId } = req.user;
    const resultBaac = await req.context.models.bank_account.findByPk(accBank);

    if (!(resultBaac.dataValues.baac_user_id === userId))
      return res.sendStatus(403);
    if (!(resultBaac.dataValues.baac_pin_number === pinBank))
      return res.sendStatus(401);

    req.baac = resultBaac.dataValues;
    return next();
  } catch (error) {
    return res.send(error);
  }
};

const checkSaldoBank = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const saldoBaac = parseFloat(req.baac.baac_saldo);
    if (!(saldoBaac >= amount)) return res.sendStatus(400);
    return next();
  } catch (error) {
    return res.send(error);
  }
};

const updateSaldoBank = async (req, res, next) => {
  try {
    const { amount, accBank } = req.body;

    if (req.payt.payt_type === "topup") {
      await req.context.models.bank_account.update(
        {
          baac_saldo: parseFloat(req.baac.baac_saldo) - amount,
        },
        { returning: true, where: { baac_acc_bank: accBank } }
      );
      return res.send(req.payt);
    }

    if (req.payt.payt_type === "transfer") {
      await req.context.models.bank_account.update(
        {
          baac_saldo: parseFloat(req.baac.baac_saldo) + amount,
        },
        { returning: true, where: { baac_acc_bank: accBank } }
      );
      return res.send(req.payt);
    }

    return res.sendStatus(400)
  } catch (error) {
    return res.send(error);
  }
};

export default {
  findAllBaac,
  findBaacByPk,
  findBankAccountByUserId,
  createBaac,
  updateBaac,
  deleteBaac,
  addSaldo,
  checkPinBank,
  checkSaldoBank,
  updateSaldoBank,
};
