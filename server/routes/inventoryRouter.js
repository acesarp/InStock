const path = require("path");
const INVENTORY_FILE_PATH = './data/inventory.json';
const inventory = require(INVENTORY_FILE_PATH);
const RESOLVED_FILE_PATH = path.join(path.resolve(__dirname, INVENTORY_FILE_PATH));
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
    req.body.id = uuid();
    const data = createObject(req.body);
    inventory.push(data);
    saveTofile(inventory) ? res.status(200).send({ item: data }) : res.status(500);
});

/**
 * POST add new inventory item
 */
router.put('/', (req, res) => {
    //console.log("req.body ", req.body);
    const itemFound = inventory.filter(item => item.id === req.body.id)[0];
    if (!itemFound) {
        res.status(400).send("Item not found");
        return;
    }

    let data = createObject(req.body);
    const objIndex = inventory.indexOf(itemFound);
    inventory.splice(objIndex, 1, data);
    //console.log(objIndex);

    saveTofile(inventory) ? res.status(200).send({ item: data }) : res.status(500);
});

/*
* DELETE inventory item by id
*/
router.delete('/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ error: "Inventory item id is null" });
        return;
    } 

    let deletedItem = {};
    let found = false;
    let index = 0;
    for (; index < inventory.length; ++index) {
        if (inventory[index].id === req.params.id) { 
          console.log(inventory[index].id);
          console.log(req.params.id);
            found = true;
            deletedItem = inventory[index]; 
            inventory.splice([index], 1);
            break;
        }
    }
    if (!found) {
        res.status(404).send({ error: "Inventory item not found" });
        return;
    }

    try {
        fs.writeFile(RESOLVED_FILE_PATH, JSON.stringify(inventory, null, 4), (error) => {
            if (!error) {
                console.log(deletedItem);
                res.status(200).send({ deleted: deletedItem });
            }
            else {
                console.error(error);
            }
        });
    }
    catch (error) {
        res.status(500);
    }
});


/**
 * 
 * @param {JSON} content_ 
 */
function saveTofile(content_) {
    try {
        fs.writeFile(RESOLVED_FILE_PATH, JSON.stringify(content_, null, 4), (error) => {
            console.log("fs.writeFile message [null is good]: ", error);
            if (!error) {
                // console.log(true);
                return true;
            }
            else {
                return false;
            }
        });
    }
    catch (error) {
        return false;
    }
}

/**
 * 
 * @param {Object} body_ 
 */
function createObject(body_) {
    return {
        id: body_.id,
        warehouseID: body_.warehouseID,
        warehouseName: body_.warehouseName,
        itemName: body_.itemName,
        description: body_.description,
        category: body_.category,
        status: body_.status,
        quantity: body_.quantity
    };
}

module.exports = router;