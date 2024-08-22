const express=require('express');
//cross origin resourse sharing.
const cors=require('cors');
const userRouter=require('./routers/userRouter');
const orderRouter=require('./routers/orderRouter');
const morgan = require('morgan');
const paymentRouter=require('./routers/paymentRouter')
const compression=require('compression')


const app=express();

app.use(compression())
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))



app.use('/user',userRouter);
app.use('/order',orderRouter);
app.use('/payment',paymentRouter)



module.exports=app;
