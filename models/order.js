const {Schema,model}=require('mongoose');



const orderSchema=Schema({
    userId:Schema.Types.ObjectId,
    ingredients:[
        {type:{type:String},amount:Number}],
    customer:{
        deliveryAdress:String,
        phone:String,
        paymentType:String,
    },
    price:Number,
    transaction_id:{
        type:String,
        unique:true},
    orderTime:{type:Date,default:Date.now},
    status:{
        type:String,
        default:'pending',
        enum:["pending","Complete"]
    },
    sessionKey:String

})


module.exports.Order=model('Order',orderSchema);