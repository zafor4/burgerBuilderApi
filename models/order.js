const {Schema,model}=require('mongoose');



const orderSchema=Schema({
    userId:Schema.Types.ObjectId,
    ingredients:[{type:{type:String},amount:Number}],
    customer:{
        deliveryAdress:String,
        phone:String,
        paymentType:String,
    },
    price:Number,
    orderTime:{type:Date,default:Date.now},
    status:{
        type:String,
        default:'pending',
        enum:["Pending","Complete"]
    }

})


module.exports.Order=model('Order',orderSchema);