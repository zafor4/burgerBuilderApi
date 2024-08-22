const express=require('express');
//cross origin resourse sharing.
const cors=require('cors');
const userRouter=require('./routers/userRouter');
const orderRouter=require('./routers/orderRouter');
const morgan = require('morgan');




const app=express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'))


app.use('/user',userRouter);
app.use('/order',orderRouter);



module.exports=app;
