
const findReCaAll = async (req, res) => {
    try {
        const result = await req.context.models.resto_category.findAll();
        return res.send(result);
    } catch (error) {
        return res.send(error);
    }

}

const findReCaByPk = async (req, res) => {
    try {
        const result = await req.context.models.resto_category.findByPk(
            req.params.id
        );
        return res.send(result);
    } catch (error) {
        return res.send(error);
    }
}

const createReCa = async (req, res) => {
    try {
        const { reca_name, reca_desc } = req.body;
        const result = await req.context.models.resto_category.create({
            reca_name: reca_name,
            reca_desc: reca_desc
        });
        return res.send(result);
    } catch (error) {
        return res.send(error);
    }

}

const updateReCa = async (req, res) => {
    try {
        const { reca_desc } = req.body;
        const result = await req.context.models.resto_category.update(
            { reca_name: reca_name, reca_desc: reca_desc },
            { returning: true, where: { reca_name: req.params.id } }
        );
        return res.send(result);
    } catch (error) {
        return res.send(error);
    }

}

const deleteReCa = async (req, res) => {
    try {
        const id = req.params.id;
        await req.context.models.resto_category.destroy({
            where: {
                reca_name: id
            }
        });
        return res.send(result + " rows deleted.");
    } catch (error) {
        return res.sendStatus(404).send("Data not found.");
    }


}



export default {
    findReCaAll,
    findReCaByPk,
    createReCa,
    updateReCa,
    deleteReCa
}