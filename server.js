const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

//DOTENV
dotenv.config();

// MONGODB CONNECTION
connectDB();

//REST OBJECT
const app = express();

//middlewares
const corsOptions = {
  origin: process.env.REACT_APP_DEV_ORIGIN, // Replace with your app's origin
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'] // Allow additional methods
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan("dev"));

//ROUTES
app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/api/v1/service", require("./routes/serviceRoutes"));
app.use("/api/v1/postdesc", require("./routes/postRoutes"));
app.use("/api/v1/commitment", require("./routes/commitmentRoutes"));
app.use("/api/v1/complaint",require("./routes/complaintRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/feedback",require("./routes/feedbackRoutes"));


//HOME
app.get("/", (req,res)=>{
  res.status(200).send({
    "success":true,
    "msg":"node server running"
  })
})

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server Runnning ${PORT}`.bgGreen.white);
});