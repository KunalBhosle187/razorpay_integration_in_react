import { useEffect } from "react";
import "./App.css";
import axios from "axios";

const App = () => {

  // BY USING USEEFFECT LOAD RAZORPAY SCRIPT ON 1ST COMPONENT LOAD
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://checkout.razorpay.com/v1/checkout.js`;
    script.async = true;
    document.body.appendChild(script);

  }, []);


//CREATE ASYNC FUNCTION FOR API CALLS BY USING AXIOS

  async function displayRazorpay() {

    //SEND POST REQUEST TO BACKEND API AND STORE ITS VALUE INTO RESULT VARIABLE
    const result = await axios.post("http://localhost:5000/payment/orders");
   
    //DESTRUCTURE FOLLOWING VALUES FROM RESULT
    const { amount, id: order_id, currency } = result.data;

    //DISPLAY RESULT ON CONSOLE ONLY FOR TESTING PURPOSE
    console.log("response from order api", result.data);

    //FOLLOWING OPTIONS ARE DEFAULT FROM RAZORPAY WE HAVE TO COPY IT FROM THERE DEVELOPER SIDE
    const options = {
      key: "rzp_test_NoHYBZbeflEh1h",     // Enter the Key ID generated from the Dashboard
      amount: amount.toString() * 100,    
      currency: currency,
      name: "razorpay demo ",
      description: "Test Transaction",
      image: "",
      order_id: order_id,

      handler: async function (response) { //DEFAULT RAZORPAY HANDLER FOR HANDLING RESPONSE FROM API
        alert("payment Successful");
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
      
        // IF EVERYTHING OK THEN SEND POST REQUEST WITH DATA WHICH GET FROM RAZORPAY ORDER API
        // TO RAZORPAY SUCCESS API WHICH STORE ORDER DATA TO OUR RAZORPAY DASHBOARD
        const result = await axios.post("http://localhost:5000/payment/success",data);
        alert(result.data.msg);
      },
     
       // Prefill the payment method for customers based on their past payment preferences.
       // For example, you can ensure when the customer opens the link, card appears selected 
       // as the payment method.
       //  ITS NOT COMPULSORY IF YOU ADD IT THEN ADD OTHERWISE USER TYPE THERE CREDENTIALS MANUALY

      prefill: {
        name: "kunal",
        email: "kunalbhosle555@gmail.com",
        contact: "8459009103",
      },
      notes: {
        address: "address",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    // IF PAYMENT FAILED DUE TO ANY ERROR THEN FOLLOWING CODE HELP US TO HANDLE ERROR
    paymentObject.on("payment.failed", function (response) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });
  }

  return (
    <div>
      {/* ADD DISPLAYRAZORPAY FUNCTION IN BUTTON WITH THE HELP OF ONCLICK EVENT */}
      <button onClick={displayRazorpay}>RazorPay Button</button>
    </div>
  );
};

export default App;
