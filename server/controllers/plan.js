const { findByIdAndDelete } = require('../models/Plan');
const Plan = require('../models/Plan')

//@route /allPlans
//@desc GET get all plans
//@access Public
async function getAllPlans(req,res){
    try {
        let plans = await Plan.find();
        res.status(200).json(plans);
    } catch (err) {
        res.status(500).json(err.message)
    }
}



//@route /myPlans
//@desc GET get  single plan
//@access Private
async function getPlan(req,res){
    try {   
        let {id} = req.params
        let plan = await Plan.findById(id);
        if(!plan) return res.status(400).json("plan not found")

        res.status(200).json(plan);

    } catch (err) {
        res.status(500).json(err.message)        
    }
}


//@route /plans
//@desc POST to create  a plan
//@access private/admin/owner
async function createPlan(req,res){
    try {
        let plan = await Plan.create({...req.body});
        if(!plan) return res.status(400).json("unable to create plan")
        res.status(200).json(plan);
    } catch (error) {
        res.status(500).json(error.message)        
    }
}

//@route /plans/:id
//@desc PUT to update a plan
//@access private/admin/owner

async function updatePlan(req,res){
    try{
        let {id} = req.params;
        var plan = await Plan.findById(id);

        if(!plan) return res.status(400).json("plan not found");

        let reqKeys = Object.keys(req.body);

        reqKeys.map(key=>{
            plan[key] = req.body[key];
        })
        await plan.save();

        res.status(200).json("plan updated")
    }
    catch(err){
        res.status(500).json(err.message)        
    }
}

//@route /plans/:id
//@desc DELETE to delete a plan
//@access private/admin/owner
async function deletePlan(req,res){
    try {
        let {id} = req.params;
        let plan = await findByIdAndDelete(id);
        if(!plan) return res.status(404).json("plan doesnt exist");

        res.status(200).json("plan deleted")

    } catch (err) {
        res.status(500).json(err.message)
    }
}


async function topPlans(req,res){
    try {
            const plans = await Plpan.find()
            .sort({
                ratings:-1
            })
            .limit(3);

            return res.json(plans);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports =  {getAllPlans,getPlan,createPlan,updatePlan,deletePlan,topPlans} 