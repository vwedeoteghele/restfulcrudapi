const express = require("express");
const color = require("colors")
const dotenv = require("dotenv").config();
const connectDB = require("../backend/config/db")
const port = process.env.PORT || 5000;
const {errorHandler} = require("./middlewares/errorHandlers")

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use("/api/goals", require("./routes/goalRoute.js"))

app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`))