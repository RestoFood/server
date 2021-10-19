const getAllShop = async (req, res) => {
  try {
    const result = await req.context.models.resto_shop.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const getShopById = async (req, res) => {
  try {
    const result = await req.context.models.resto_shop.findByPk(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const createShop = async (req, res) => {
  const { reto_name, reto_open_hours, reto_user_id, reto_resto_type } =
    req.body;
  try {
    const result = await req.context.models.resto_shop.create({
      reto_name: reto_name,
      reto_open_hours: reto_open_hours,
      reto_rating: 0,
      reto_approval: false,
      reto_user_id: reto_user_id,
      reto_resto_type: reto_resto_type,
    });
    return res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const updateShop = async (req, res) => {
  const { reto_name, reto_open_hours, reto_resto_type } = req.body;
  try {
    const result = await req.context.models.resto_shop.update(
      {
        reto_name: reto_name,
        reto_open_hours: reto_open_hours,
        reto_resto_type: reto_resto_type,
      },
      { returning: true, where: { reto_id: req.params.id } }
    );
    return res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const deleteShop = async (req, res) => {
  const id = req.params.id;
  try {
    await req.context.models.resto_shop.destroy({
      where: { reto_id: id },
    });
    return res.send("deleted");
  } catch (error) {
    return res.send(error);
  }
};

export default { getAllShop, getShopById, createShop, updateShop, deleteShop };
