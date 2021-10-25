const findAddrAll = async (req, res) => {
  try {
    const result = await req.context.models.address.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findAddrByPk = async (req, res) => {
  try {
    const result = await req.context.models.address.findByPk(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findAddrByUserId = async (req, res) => {
  const { userId } = req.user;
  try {
    const result = await req.context.models.address.findAndCountAll({
      where: { addr_user_id: userId },
    });

    return res.send(result);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

const createAddr = async (req, res) => {
  const { addr_name, addr_detail, addr_latitude, addr_longitude } = req.body;
  const { userId } = req.user;

  try {
    const result = await req.context.models.address.create({
      addr_name: addr_name,
      addr_detail: addr_detail,
      addr_latitude: addr_latitude,
      addr_longitude: addr_longitude,
      addr_user_id: userId,
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const updateAddr = async (req, res) => {
  const { addr_name, addr_detail, addr_latitude, addr_longitude } = req.body;
  const id = req.params.id;
  const { userId } = req.user;
  try {
    const result = await req.context.models.address.update(
      {
        addr_name: addr_name,
        addr_detail: addr_detail,
        addr_latitude: addr_latitude,
        addr_longitude: addr_longitude,
      },
      { returning: true, where: { addr_id: id, addr_user_id: userId } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const deleteAddr = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.user;
  try {
    const result = await req.context.models.address.destroy({
      where: { addr_id: id, addr_user_id: userId },
    });
    return res.send(result + " row deleted.");
  } catch (error) {
    return res.sendStatus(404).send("Data not found.");
  }
};

export default {
  findAddrAll,
  findAddrByPk,
  findAddrByUserId,
  createAddr,
  updateAddr,
  deleteAddr,
};
