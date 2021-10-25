const findAllRere = async (req, res) => {
  try {
    const result = await req.context.models.resto_reviews.findAll();
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send("no data found.");
  }
};

const findRereById = async (req, res) => {
  try {
    const result = await req.context.models.resto_reviews.findByPk(
      req.params.id
    );
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send("no data found.");
  }
};

const createRere = async (req, res) => {
  const { rere_comments, rere_rating, rere_user_id, rere_reto_id } = req.body;
  const { userId } = req.user;
  try {
    const result = await req.context.models.resto_reviews.create({
      rere_comments: rere_comments,
      rere_rating: rere_rating,
      rere_user_id: userId,
      rere_reto_id: rere_reto_id,
    });
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404);
  }
};

const updateRere = async (req, res) => {
  const { rere_comments, rere_rating } = req.body;
  const { userId } = req.user;
  try {
    const result = await req.context.models.resto_reviews.update(
      {
        rere_comments: rere_comments,
        rere_rating: rere_rating,
      },
      {
        returning: true,
        where: { rere_id: req.params.id, rere_user_id: userId },
      }
    );
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send("no data found.");
  }
};

const deleteRere = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.user;
  try {
    const result = await req.context.models.resto_reviews.destroy({
      where: { rere_id: id, rere_user_id: userId },
    });
    return res.send(`delete ${result} rows.`);
  } catch (error) {
    return res.sendStatus(404).send(`Data not found.`);
  }
};

export default {
  findAllRere,
  findRereById,
  createRere,
  updateRere,
  deleteRere,
};
