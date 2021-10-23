const findAllBank = async (req, res) => {
  try {
    const result = await req.context.models.bank.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findBankByPk = async (req, res) => {
  try {
    const result = await req.context.models.bank.findByPk(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const createBank = async (req, res) => {
  const { bank_name } = req.body;
  try {
    const result = await req.context.models.bank.create({
      bank_name,
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const updateBank = async (req, res) => {
  const { bank_name } = req.body;
  const id = req.params.id;
  try {
    const result = await req.context.models.bank.update(
      {
        bank_name: bank_name,
      },
      { returning: true, where: { bank_id: id } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const deleteBank = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await req.context.models.bank.destroy({
      where: { bank_id: id },
    });
    return res.send(result + " row deleted.");
  } catch (error) {
    return res.sendStatus(404).send("Data not found.");
  }
};

export default {
  findAllBank,
  findBankByPk,
  createBank,
  updateBank,
  deleteBank,
};
