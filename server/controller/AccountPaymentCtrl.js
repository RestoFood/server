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
  try {
    const result = await req.context.models.account_payment.update(
      {
        acc_pin_number: acc_pin_number,
      },
      { returning: true, where: { acc_number: id } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

export default {
  createAcc,
  findAllAcc,
  findAccByPk,
  updateAcc
};
