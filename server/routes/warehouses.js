const path = require("path");
const WAREHOUSES_FILE_PATH = path.join(__dirname, '../Data/warehouses.json');
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
<<<<<<< HEAD:server/routes/warehouseRouter.js
    console.info('get \'/:id\'');
    console.info(warehouses.filter(item => item.id === req.params.id));
=======
>>>>>>> main:server/routes/warehouses.js
    res.send(warehouses.filter(item => item.id === req.params.id));
});

/**
 * POST add new warehouses item
 */
router.post('/', (req, res) => {
  try {
    let data = {
<<<<<<< HEAD:server/routes/warehouseRouter.js
        id: uuid(),
        name: checkValue(req.body.name),
        address: checkValue(req.body.address),
        description: checkValue(req.body.description),
        city: checkValue(req.body.city),
        country: checkValue(req.body.country),
        contact: {
            name: checkValue(req.body.contact.name),
            position: checkValue(req.body.contact.position),
            phone: checkValue(req.body.contact.phone),
            email: checkValue(req.body.contact.email)
        }
=======
      id: uuid(),
      name: checkValue(req.body.name),
      address: checkValue(req.body.address),
      city: checkValue(req.body.city),
      country: checkValue(req.body.country),
      contact: {
          name: checkValue(req.body.contact.name),
          position: checkValue(req.body.contact.position),
          phone: checkPhoneNumber(req.body.contact.phone),
          email: emailChecker(req.body.contact.email)
      }
>>>>>>> main:server/routes/warehouses.js
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
  }
  catch(error) {
    res.status(400).json({
      error: 'Invalid property or properties. Please check body and re-send request.',
    });
  }
});


/*
* Edit warehouse
*/
router.put('/', (req, res) => {
    let found = false;
<<<<<<< HEAD:server/routes/warehouseRouter.js
    let index = 0
    const body = req.body;

    for (; index < warehouses.length; ++index) {

        if (warehouses[index].id === req.body.id) {
            try {
                found = true;
                warehouses[index].id = checkValue(body.id);
                warehouses[index].name = checkValue(body.name);
                warehouses[index].address = checkValue(body.address);
                warehouses[index].city = checkValue(body.city);
                warehouses[index].country = checkValue(body.country);
                warehouses[index].contact = {
                    name: checkValue(body.contact.name),
                    position: checkValue(body.contact.position),
                    phone: checkPhoneNumber(body.contact.phone),
                    email: emailChecker(body.contact.email)
=======
    let index = 0;
    for (; index < warehouses.length; ++index) {
        if (warehouses[index].id === req.body.id) {
            try {
                found = true;
                warehouses[index].id = checkValue(req.body.id);
                warehouses[index].name = checkValue(req.body.name);
                warehouses[index].address = checkValue(req.body.address);
                warehouses[index].city = checkValue(req.body.city);
                warehouses[index].country = checkValue(req.body.country);
                warehouses[index].contact = {
                    name: checkValue(req.body.contact.name),
                    position: checkValue(req.body.contact.position),
                    phone: checkValue(req.body.contact.phone),
                    email: checkValue(req.body.contact.email)
>>>>>>> main:server/routes/warehouses.js
                };
                break;
            }
            catch (err) {
                res.status(404).send({ error: "Invalid request" });
                return;
            }
        };
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
* Delete warehouse by id
*/
router.delete('/:id', (req, res) => {
    let deletedItem = {};
    let found = false;
    let index = 0;
    for (; index < warehouses.length; ++index) {
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
