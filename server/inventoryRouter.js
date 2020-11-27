const path = require("path");
const inventories = require('./Data/inventories.json');
let router = require('express').Router();
const uuid = require('uuid').v4;
const fs = require('fs');
/* 
* GET inventory
*/
router.get('/', function (req, res) {
    res.send(inventories);
});


module.exports = router;

