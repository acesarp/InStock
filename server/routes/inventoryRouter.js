const path = require("path");
const INVENTORY_FILE_PATH = '../Data/inventory.json';
const inventory = require(INVENTORY_FILE_PATH);
let router = require('express').Router();
const uuid = require('uuid').v4;
const fs = require('fs');


/* 
* GET inventory list
*/
router.get('/', (req, res) => {
    console.info(inventory);
    res.send(inventory);
});

/*
* GET inventory item by id
*/
router.get('/:id', (req, res) => {
    res.send(inventory.filter(item => item.id === req.params.id));
});

/**
 * POST add new inventory item
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

    inventory.push(data);
    try {
        fs.writeFile(INVENTORY_FILE_PATH, JSON.stringify(inventory), () => {
            res.status(200).send(data);
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
});

/*
* GET inventory by id
*/
router.delete('/:id', (req, res) => {
    let deletedItem = {};
    let found = false;
    let index = 0;
    for (; index < inventory.length; ++index) {
        if (inventory[index].id === req.params.id) {
            deletedItem = inventory[index];
            delete inventory[index];
        }
        break;
    }

    if (!found) {
        res.status(404).send({ error: "Warehouse not found" });
        return;
    }
    try {
        fs.writeFile(INVENTORY_FILE_PATH, JSON.stringify(inventory), () => {
            res.send({ deleted: deletedItem });
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
});


module.exports = router;

