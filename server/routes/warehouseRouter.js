const path = require("path");
const WAREHOUSES_FILE_PATH = '../Data/warehouses.json';
const warehouses = require(WAREHOUSES_FILE_PATH);
let router = require('express').Router();
const uuid = require('uuid').v4;
const fs = require('fs');
const { emailChecker, checkValue, checkPhoneNumber } = require('../fieldChecker.js');

/* 
* GET warehouses list
*/
router.get('/', (req, res) => {
    console.info('get \'/\'');
    res.send(warehouses);
});

/* 
* GET warehouses list of names
*/
router.get('/names', (req, res) => {
    console.info('get \'/names\'');
    const result = warehouses.map(item => item.name); 
    console.debug(result);
    res.send(result);
});

/*
* GET warehouse by id
*/
router.get('/:id', (req, res) => {
    console.info('get \'/:id\'');
    console.info(warehouses.filter(item => item.id = req.params.id));
    res.send(warehouses.filter(item => item.id = req.params.id));
});

/**
 * POST add new warehouses item
 */
router.post('/', (req, res) => {
    let data = {
        id: uuid(),
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        city: req.body.city,
        country: req.body.country,
        contact: {
            name: req.body.contact.name,
            position: req.body.contact.position,
            phone: req.body.contact.phone,
            email: req.body.contact.email
        }
    };
    warehouses.push(data);
    try {
        fs.writeFile(WAREHOUSES_FILE_PATH, JSON.stringify(warehouses), () => {
            res.status(200).send(data);
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
});


/*
* Edit warehouse
*/
router.put('/', (req, res) => {
    let found = false;
    let index = 0
    for (; index < Object.keys(warehouses).length; ++index) {
        if (warehouses[index].id === req.body.id) {
            try {
                found = true;
                warehouses[index].id = checkValue(req.body.id);
                warehouses[index].name = checkValue(req.body.name);
                warehouses[index].address = checkValue(req.body.address);
                warehouses[index].description = checkValue(req.body.description);
                warehouses[index].city = checkValue(req.body.city);
                warehouses[index].country = checkValue(req.body.country);
                warehouses[index].contact = {
                    name: checkValue(req.body.contact.name),
                    position: checkValue(req.body.contact.position),
                    phone: checkPhoneNumber(req.body.contact.phone),
                    email: emailChecker(req.body.contact.email)
                };
            }
            catch (err) {
                res.status(404).send({ error: "Invalid request" });
                return;
            }
        };
        break;
    }
    
    if (!found) {
        res.status(404).send({ error: "Warehouse not found" });
        return;
    }
    try {
        fs.writeFile(WAREHOUSES_FILE_PATH, JSON.stringify(warehouses), () => {
            res.send({ saved: warehouses[index] });
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
});


/*
* GET warehouse by id
*/
router.delete('/:id', (req, res) => {
    let deletedItem = {};
    let found = false;
    let index = 0;
    for (; index < Object.keys(warehouses).length; ++index) {
        if (warehouses[index].id === req.params.id) {
            deletedItem = warehouses[index];
            delete warehouses[index];
        }
        break;
    }

    if(!found) {
        res.status(404).send({ error: "Warehouse not found" });
        return;
    }
    try {
        fs.writeFile(WAREHOUSES_FILE_PATH, JSON.stringify(warehouses), () => {
            res.send({ deleted: deletedItem });
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
});


module.exports = router;
