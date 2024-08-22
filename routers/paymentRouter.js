const router=require('express').Router()
const SSLCommerz = require("ssl-commerz-node");
const PaymentSession = SSLCommerz.PaymentSession;
const authorized=require('../middlewares/authorize')
const {Order}=require('../models/order');
const generateUniqueId = require('generate-unique-id');



const initPayment=async (req,res)=>{
    const order=new Order(req.body)

    const userId=req.user._id
    order.userId=userId
 
   
    const tran_id=generateUniqueId()

    const payment = new PaymentSession(
        true,
        process.env.SSLCOMMERZ_STORE_ID,
        process.env.SSLCOMMERZ_STORE_PASSWORD
      );
      payment.setUrls({
        success: "yoursite.com/success", // If payment Succeed
        fail: "yoursite.com/fail", // If payment failed
        cancel: "yoursite.com/cancel", // If user cancel payment
        ipn: "yoursite.com/ipn", // SSLCommerz will send http post request in this link
      });

      payment.setOrderInfo({
        total_amount: order.price, // Number field
        currency: "BDT", // Must be three character string
        tran_id: tran_id, // Unique Transaction id
        emi_option: 0, // 1 or 0
      });
      payment.setCusInfo({
        name: "unknown",
        email: req.user.email,
        add1: "66/A Midtown",
        add2: "Andarkilla",
        city: "Chittagong",
        state: "Optional",
        postcode: 4000,
        country: "Bangladesh",
        phone: order.customer.phone,
        fax: "Customer_fax_id",
      });
      
      // Set shipping info
payment.setShippingInfo({
    method: "Courier", //Shipping method of the order. Example: YES or NO or Courier
    num_item: 2,
    name: "unknown",
    add1: order.customer.deliveryAdress,
    add2: "Andarkilla",
    city: "Chittagong",
    state: "Optional",
    postcode: 4000,
    country: "Bangladesh",
  });
  
  // Set Product Profile
  payment.setProductInfo({
    product_name: "food",
    product_category: "general",
    product_profile: "general",
  });

response =await payment.paymentInit()

return res.status(201).send(response)

}




router.route('/')
.post(authorized,initPayment)


module.exports=router