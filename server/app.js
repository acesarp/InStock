<<<<<<< HEAD
let express = require("express");
let path = require("path");
let cors = require("cors");
let cookieParser = require("cookie-parser");
const upload = require("multer")();
let router = require("./router");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
=======

let express = require('express');
let path = require('path');
let cors = require('cors');
let cookieParser = require('cookie-parser');
<<<<<<< HEAD
let warehouseRouter = require('./routes/warehouses');
let inventoryRouter = require('./routes/inventory');
=======
let warehouseRouter = require('./warehouseRouter');
let inventoryRouter = require('./inventoryRouter');
>>>>>>> selenga
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
>>>>>>> origin

let app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD
app.use(cookieParser());
app.use('/warehouses', warehouseRouter);
app.use('/inventory', inventoryRouter);

=======
<<<<<<< HEAD
app.use(upload.array("file", 2));
app.use(cookieParser());
app.use("/videos", router);

app.use(function (error, req, res, next) {
  console.log(error, req);
  next();
});
const port = process.env.PORT || "5001";
=======
app.use(cookieParser());
app.use('/warehouseRouter', warehouseRouter);
app.use('/inventoryRouter', inventoryRouter);

>>>>>>> selenga
const port = process.env.PORT || '5001';
>>>>>>> origin

app.set("port", port);
app.listen(port, () => {
  console.log(`==> App listening at http://localhost:${app.get("port")}`);
});

module.exports = app;
