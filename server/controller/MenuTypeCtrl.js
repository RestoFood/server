const findAllMenuType = async (req, res) => {
  try {
    const result = await req.context.models.menu_type.findAll();
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send("no data found.");
  }
};

const createMenuType = async (req, res) => {
  const { mety_name } = req.body;
  try {
    const result = await req.context.models.menu_type.create({
      mety_name,
    });
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404);
  }
};

export default { findAllMenuType, createMenuType };
