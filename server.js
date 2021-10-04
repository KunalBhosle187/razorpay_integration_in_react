// CREATING SERVER FOR BACKEND
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')

app.use(cors()) // USE FOR REMOVING CORS ERROR

// middlewares
app.use(express.json({ extended: false }));


// route included
app.use("/payment", require("./routes/payment"));

//LISTENING SERVER
app.listen(port, () => console.log(`server started on port ${port}`));


