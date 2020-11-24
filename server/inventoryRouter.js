const path = require("path");
<<<<<<< HEAD
const inventories = require("./Data/inventories.json");
const warehouses = require("./Data/warehouses.json");
let router = require("express").Router();
const uuid = require("uuid").v4;
const fs = require("fs");
/*
 * GET inventory
 */
router.get("/", function (req, res) {
  res.send(inventories);
});
// * GET a list of videos
// */
router.get("/", function (req, res) {});

module.exports = router;
=======
const warehouses = require('./Data/warehouses.json');
let router = require('express').Router();
const uuid = require('uuid').v4;
const fs = require('fs');
/* 
* GET a list of videos
*/
router.get('/', function (req, res) {

});


module.exports = router;

>>>>>>> a817f60f... routes created
