const path = require("path");
const INVENTORIES_FILE_PATH = './Data/inventories.json';
const inventories = require(INVENTORIES_FILE_PATH);
let router = require('express').Router();
const uuid = require('uuid').v4;
const fs = require('fs');
/* 
* GET inventory
*/
router.get('/:id', (req, res) => {
    res.send(inventories.filter(item => item.id = req.params.id));
});

/**
 * POST new inventory item
 */
router.post('/', (req, res) => {
    let data = {
        id: uuid(),
        warehouseID: req.body.warehouseID,
        warehouseName: req.body.warehouseName,
        description: req.body.description,
        category: req.body.category,
        status: req.body.status,
        quantity: req.body.quantity
    };

    inventories.push(data);
    try {
        fs.writeFile(INVENTORIES_FILE_PATH, JSON.stringify(inventories), () => {
            res.status(200).send(data);
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
});


module.exports = router;

