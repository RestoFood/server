import path from "path";
import formidable from "formidable";
import UpDownloadHelper from "../helpers/UpDownloadHelper";


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

const createReme = async (req, res) => {
  try {
    const singlePart = await UpDownloadHelper.uploadSingleFile(req);
    const {
      attrb: { file, fields, filename },
      status: { status },
    } = singlePart;

    if (status === "succeed") {
      try {
        const result = await req.context.models.resto_menu.create({
          reme_name: fields.reme_name,
          reme_desc: fields.reme_desc,
          reme_price: parseFloat(fields.reme_price),
          reme_url_image: filename,
          reme_mety_name: fields.reme_mety_name,
          reme_reto_id: parseInt(fields.reme_reto_id),
        });
        return res.send(result);
      } catch (error) {
        return res.send(404).send(error);
      }
    }
    return res.send(status);
  } catch (error) {
    return res.send(error);
  }
};

const updateReme = async (req, res) => {
  try {
    const singlePart = await UpDownloadHelper.uploadSingleFile(req);
    const {
      attrb: { file, fields, filename },
      status: { status },
    } = singlePart;

    if (status === "succeed") {
      try {
        const result = await req.context.models.resto_menu.update(
          {
            reme_name: fields.reme_name,
            reme_desc: fields.reme_desc,
            reme_price: parseFloat(fields.reme_price),
            reme_url_image: filename,
            reme_mety_name: fields.reme_mety_name,
            reme_reto_id: parseInt(fields.reme_reto_id),
          },
          { returning: true, where: { reme_id: parseInt(req.params.id) } }
        );
        return res.send(result);
      } catch (error) {
        return res.send(404).send(error);
      }
    }
    return res.send(status);
  } catch (error) {
    return res.send(error);
  }
};

const deleteReme = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await req.context.models.resto_menu.destroy({
      where: { reme_id: id },
    });
    return res.send(`delete ${result} rows.`);
  } catch (error) {
    return res.sendStatus(404).send(`Data not found.`);
  }
};

export default {
  findAllReme,
  findRemeById,
  createReme,
  updateReme,
  deleteReme,
};
