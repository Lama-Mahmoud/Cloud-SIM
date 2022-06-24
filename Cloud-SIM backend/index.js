require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require("./model/User");
const port = 3000;

const app = express();
app.use(express.json());

const DB_CONNECT = process.env.DB_CONNECT || "";
mongoose.connect(
  DB_CONNECT,
  (err) => 
 { if(!err)
    console.log("connected succesfully");
  else
    console.log(err);
}
);


app.listen(
    port,
    () => console.log(`Listening on port ${port}`)
  );