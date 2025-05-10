const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const activity = require('./routes/activityRoutes');
const auth = require('./routes/authRoutes');
const booking = require('./routes/bookingRoutes');
const connection = require('./config/db');

const app = express();
app.use(express.json());




const start=async()=>{
    await connection();
    app.use('/activity',activity);
    app.use('/auth',auth);
    app.use('/booking',booking);


}
start();

app.listen(process.env.PORT,()=>console.log(`Server started! at ${process.env.PORT}`));
