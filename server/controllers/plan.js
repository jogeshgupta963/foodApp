const Plan = require('../models/Plan')


async function createPlan(req,res){
    try {
        
        const plan = await Plan.create({...req.body});
        res.json(plan)
    } catch (error) {
        res.json(error.message)
    }
}

module.exports = {createPlan}