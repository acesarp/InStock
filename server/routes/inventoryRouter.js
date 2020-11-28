const path = require("path");
const INVENTORY_FILE_PATH = '../Data/inventory.json';
const INVENTORY_FILE_ABSOLUTE_PATH = "/Users/augusto/Dropbox/Brainstorm/repo/instock/server/Data/inventory.json";
const inventory = require(INVENTORY_FILE_PATH);
let router = require('express').Router();
const uuid = require('uuid').v4;
const fs = require('fs');


/* 
* GET inventory list
*/
router.get('/', (req, res) => {
    //console.info(inventory);
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
    //console.log("req.body ", req.body);

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
        fs.writeFile(INVENTORY_FILE_ABSOLUTE_PATH, JSON.stringify(inventory), (error) => {
            console.log("fs.writeFile message [null is good]: ", error);
            if (!error) {
                res.status(200).send({ itemAdded: data });
            }
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
});

/*
* GET inventory item by id
*/
router.delete('/:id', (req, res) => {
    if (!req.params.id) {
        res.status(404.1).send({ error: "Inventory item id is null" });
        return;
    } 

    let deletedItem = {};
    let found = false;
    let index = 0;
    for (; index < inventory.length; ++index) {
        if (inventory[index].id === req.params.id) { 
            deletedItem = inventory[index];
            
            found = true;
            console.debug("Deleted: ", deletedItem.id);
            break;
        }
    }
    if (!found) {
        res.status(404).send({ error: "Inventory item not found" });
        return;
    }

    try {
        fs.writeFile(INVENTORY_FILE_ABSOLUTE_PATH, JSON.stringify(inventory), (error) => {
            if (!error) {
                inventory.splice([index], 1);
                res.status(200).send({ deleted: deletedItem });
            }
            else {
                console.error(error);
            }
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
});


module.exports = router;

