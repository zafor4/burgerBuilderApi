//Connect to MongoDB
//Run server

const dotenv=require('dotenv');
dotenv.config();
const app=require('./app');
const mongoose=require('mongoose');

global.__basedir=__dirname

const DB=process.env.MONGODB_SERVER.replace('<PASSWORD>',process.env.DB_PASSWORD)
mongoose.connect(DB)
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.log("MongoDB Connection Failed!!"));

const port =process.env.PORT || 3001


app.listen(port,()=>console.log(`Listening on port ${port}`));