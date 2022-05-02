const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');
require('dotenv').config();


const connect = require('./database/connect')


//routers
const user = require('./routes/user');
const plan = require('./routes/plan')

const app =express();

app.use(cors());
app.use(cookieParser())
app.use(express.json());

//routes
app.use('/user',user);
app.use('/plan',plan);


(async function(){

    try {
        
        await connect(process.env.MONGO_URI)
        console.log('dbConnected');
        app.listen(process.env.PORT||5000 , ()=>{
            console.log("server started");
        })
    } catch (error) {
        console.log(error.message)
    }

})();