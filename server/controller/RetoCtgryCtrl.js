
const findReCaAll = async(req,res)=>{
    const result = await req.context.models.resto_category.findAll();
    return res.send(result);
}

const findReCaByPk = async(req,res)=>{
    const id = req.params.id;
    const result = await req.context.models.resto_category.findByPk(
        id
    );
    return res.send(result);
}

// ----------------------------

// create new resto_category
const createReCa = async(req,res)=>{
    const {reca_name,reca_desc} = req.body;
    const result = await req.context.models.resto_category.create({
        reca_name:reca_name,
        reca_desc:reca_desc
    });
    return res.send(result);
}

// update resto_category 
const updateReCa = async(req,res)=>{
    const {reca_name,reca_desc} = req.body;
    const result = await req.context.models.resto_category.update(
        {reca_name : reca_name, reca_desc:reca_desc},
        {returning : true}
        );
    return res.send(result);
}

// delete from resto_category 
const deleteReCa = async(req,res)=>{
    const id = req.params.id;
    await req.context.models.resto_category.destroy({
        where : {
            reca_name : id}
    }).then(result =>{
        return res.send("delete "+result+" rows.")
    }).catch(error =>{
        return res.sendStatus(404).send("Data not found.")
    });
    
}



export default{
    findReCaAll,
    findReCaByPk,
    createReCa,
    updateReCa,
    deleteReCa
}