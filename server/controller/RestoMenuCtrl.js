const findAllReme = async (req, res) => {
  try {
    const result = await req.context.models.resto_menu.findAll();
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send("no data found.");
  }
};

const findRemeById = async (req, res) => {
  try {
    const result = await req.context.models.resto_menu.findByPk(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send("no data found.");
  }
};

const createReme = async (req,res) => {
    const {reme_name,reme_desc,reme_price,reme_mety_name,reme_reto_id} = req.body;
    try {
        const result = await req.context.models.resto_menu.create({
            reme_name : reme_name,
            reme_desc : reme_desc,
            reme_price : reme_price,
            reme_mety_name : reme_mety_name,
            reme_reto_id : reme_reto_id
        });
        return res.send(result);
    } catch (error) {
        return res.sendStatus(404)
    }
}

const updateReme = async (req, res) => {
  const { reme_name, reme_desc, reme_price, reme_mety_name } = req.body;
  try {
    const result = await req.context.models.resto_menu.update(
      {
        reme_name: reme_name,
        reme_desc: reme_desc,
        reme_price: reme_price,
        reme_mety_name: reme_mety_name,
      },
      {
        returning: true,
        where: { reme_id: req.params.id },
      }
    );
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send("no data found.");
  }
};

const deleteReme = async (req, res) => {
  const id = req.params.id;
  
  const result = await req.context.models.resto_menu
    .destroy({
      where: { reme_id: id },
    })
    .then((result) => {
      return res.send(`delete ${result} rows.`);
    })
    .catch((error) => {
      return res.sendStatus(404).send(`Data not found.`);
    });
};

export default {
  findAllReme,
  findRemeById,
  createReme,
  updateReme,
  deleteReme
}