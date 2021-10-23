import { sequelize } from "../models/indexModel";

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

const createBaac = async (req, res) => {
  const {
    baac_acc_bank,
    baac_owner,
    baac_saldo,
    baac_pin_number,
    baac_type,
    baac_user_id,
    baac_bank_id,
  } = req.body;
  try {
    const result = await req.context.models.bank_account.create({
      baac_acc_bank: baac_acc_bank,
      baac_owner: baac_owner,
      baac_saldo: baac_saldo,
      baac_pin_number: baac_pin_number,
      baac_start_date: sequelize.literal("current_timestamp"),
      baac_end_date: sequelize.literal("current_timestamp + interval '4 year'"),
      baac_type: baac_type,
      baac_user_id: baac_user_id,
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
  try {
    const result = await req.context.models.bank_account.update(
      {
        baac_pin_number: baac_pin_number,
      },
      { returning: true, where: { baac_acc_bank: id } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};


const addSaldo = async (req, res) => {
  const { saldo } = req.body;
  try {
    const result = await req.context.models.bank_account.update(
      {
        baac_saldo: parseFloat(req.baac.baac_saldo) + saldo,
      },
      { returning: true, where: { baac_acc_bank: req.baac.baac_acc_bank } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const deleteBaac = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await req.context.models.bank_account.destroy({
      where: { baac_acc_bank: id },
    });
    return res.send(result + " row deleted.");
  } catch (error) {
    return res.sendStatus(404).send("Data not found.");
  }
};

export default {
  findAllBaac,
  findBaacByPk,
  createBaac,
  updateBaac,
  deleteBaac,
  addSaldo,
};
