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

const createReme1 = async (req, res) => {
  const uploadDir = process.cwd() + "/storages/";

  //config option for formidale
  const options = {
    multiples: true,
    keepExtensions: true,
    uploadDir: uploadDir,
    maxFileSize: 50 * 1024 * 1024, // 5MB
  };
  const form = formidable(options);

  // onpart untuk override stream sebelum di write ke folder
  form.onPart = function (part) {
    if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
      this.handlePart(part);
    } else {
      form._error(new Error("File type is not supported"));
    }
  };

  // parsing form yang dikirim dari client
  form.parse(req, async (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
        error: error.stack,
      });
    }

    if (files.uploadFile.length > 1) {
      return res.status(400).json({
        status: "error",
        message: "only one file allowed",
        error: "",
      });
    }

    const uploadFile = files.uploadFile.path;

    const seq = path.sep;
    const urlImage = uploadFile
      .substr(uploadFile.lastIndexOf(seq), uploadFile.length)
      .replace(seq, "");

    try {
      const result = await req.context.models.resto_menu.create({
        reme_name: fields.reme_name,
        reme_desc: fields.reme_desc,
        reme_price: parseFloat(fields.reme_price),
        reme_url_image: urlImage,
        reme_mety_name: fields.reme_mety_name,
        reme_reto_id: parseInt(fields.reme_reto_id),
      });
      return res.send(result);
    } catch (error) {
      return res.status(404).json({
        status: "Failed",
        message: "",
        error: error,
      });
    }
  });
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
