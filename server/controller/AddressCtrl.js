
const findAddrAll = async(req,res)=>{
    const result = await req.context.models.address.findAll();
    return res.send(result);
}


const findAddrByPk = async(req,res)=>{
    const result = await req.context.models.address.findByPk(
        req.params.id
    );
    return res.send(result);
}

// ----------------------------

// create new address
const createAddr = async(req,res)=>{
    const {addr_id,addr_name, addr_detail, addr_latitude, addr_longitude, addr_user_id} = req.body;
    const result = await req.context.models.address.create({
        addr_id :addr_id,
        addr_name : addr_name,
        addr_detail : addr_detail,
        addr_latitude : addr_latitude,
        addr_longitude : addr_longitude,
        addr_user_id : addr_user_id
    });
    return res.send(result);
}

// update address 
const updateAddr = async(req,res)=>{
    const {addr_name} = req.body;
    const id = req.params.id;
    
    const result = await req.context.models.address.update(
        {addr_name : addr_name},
        {returning : true,
            where : {addr_id : id}
        }
        );
    return res.send(result);
}

// delete from address 
const deleteAddr = async(req,res)=>{
    const id = req.params.id;

    await req.context.models.address.destroy({
        where : {addr_id : id}
    }).then(result =>{
        return res.send("delete "+result+" rows.")
    }).catch(error =>{
        return res.sendStatus(404).send("Data not found.")
    });
    
}



export default{
    findAddrAll,
    findAddrByPk,
    createAddr,
    updateAddr,
    deleteAddr
}