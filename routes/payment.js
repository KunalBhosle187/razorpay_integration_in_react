require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();


router.post("/orders", async (req, res) => {
  try {
    
    //YOU GET FOLLOWING TEMPLATE ON RAZORPAY DEVELOPER SITE
    // IF YOU STUCK IN THE MIDDLE OF CODE RAZORPAY DOCS HELP YOU https://razorpay.com/docs/payment-gateway/web-integration/standard/
   
    // ITS CREATE INSTANCE 
    const instance = new Razorpay({
      key_id: "ADD RAZORPAY ID WHICH GET WHEN WE REGISTERED ON RAZORPAY PLATFORM ",
      key_secret: "ADD RAZORPAY SECRETE WHICH GET WHEN WE REGISTERED ON RAZORPAY PLATFORM",
      //FOR SECURITY PURPOSE I WILL SUGGEST YOU TO STORE YOUR RAZORPAY CREDENTIALS IN .ENV FILE
    });

    const options = {
      amount: 50000, // amount in smallest currency unit
      currency: "INR", // WRITE CURRENCY TYPE AS PER YOUR NEED
      receipt: "receipt_order_74394", // USE UNIQUE ID NODE LIBRARY FOR GENRETING UNIQUE ID FOR INDIVIDUAL ORDERS
    };

    // CREATE INSTATANCE OF ORDERS WHICH CONTAINE OPTIONS AND STORE IT IN ORDER VARIABLE
    const order = await instance.orders.create(options);
     
    // WRITE FOLLOWING LOGIC FOR HANDLING ERRORS
    if (!order) return res.status(500).send("Some error occured");
    res.json(order);

  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
