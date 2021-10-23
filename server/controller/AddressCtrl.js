
const findAddrAll = async (req, res) => {
    try {
        const result = await req.context.models.address.findAll();
        return res.send(result);
    } catch (error) {
        return res.send(error);
    }

}


const findAddrByPk = async (req, res) => {
    try {
        const result = await req.context.models.address.findByPk(
            req.params.id
        );
        return res.send(result);
    } catch (error) {
        return res.send(error);
    }

}

const createAddr = async (req, res) => {
    const { addr_name, addr_detail, addr_latitude, addr_longitude, addr_user_id } = req.body;
    try {
        const result = await req.context.models.address.create({
            
            addr_name: addr_name,
            addr_detail: addr_detail,
            addr_latitude: addr_latitude,
            addr_longitude: addr_longitude,
            addr_user_id: addr_user_id
        });
        return res.send(result);
    } catch (error) {
        return res.send(error);
    }

}



const deleteAddr = async (req, res) => {
    const id = req.params.id;
    try {
        await req.context.models.address.destroy({
            where: { addr_id: id }
        });
        return res.send(result + " row deleted.");
    } catch (error) {
        return res.sendStatus(404).send("Data not found.")
    }}

export default {
    findAddrAll,
    findAddrByPk,
    createAddr,
    updateAddr,
    deleteAddr
}