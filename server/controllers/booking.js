require('dotenv').config()


const stripe = require('stripe')(process.env.publishable_key);
const Plan = require('../models/Plan')
const User = require('../models/User')





async function createSession(req, res){

    try {
        
        let user = await User.findById(req.user.id);
        let plan = await Plan.findById(req.params.id);


  const session = await stripe.checkout.sessions.create({

    customer_email:user.email,
    client_reference_id:plan.id,
    line_items: [
      {
          name:plan.name,
          description:plan.description,
        
            price: plan.price,
            quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/profile`,
    cancel_url: `${req.protocol}://${req.get('host')}/profile`
  });

  res.json("success");
} catch (error) {
    res.json(error.message);
}
//   res.redirect(303, session.url);
}

module.exports = {createSession}