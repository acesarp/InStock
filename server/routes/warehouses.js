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
    res.send(warehouses.filter(item => item.id === req.params.id));
});

/**
 * POST add new warehouses item
 */
router.post('/', (req, res) => {
  if (!req.body.name || !req.body.address || !req.body.city || !req.body.country || !req.body.contact.name || !req.body.contact.position || !req.body.contact.phone || !req.body.contact.email) {
    res.status(400).json({
      error: 'POST body must contain all required properties',
      requiredProperties: ['name', 'address', 'city', 'country', 'contact: name', 'contact: position', 'contact: phone', 'contact: email'],
    });
  } else {
    try {
      console.log(checkPhoneNumber(req.body.contact.phone));
      let data = {
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
  }
});


/*
* Edit warehouse
*/
router.put('/:id', (req, res) => {
    let found = false;
    let index = 0
    for (; index < warehouses.length; ++index) {
        if (warehouses[index].id === req.body.id) {
            try {
                found = true;
                warehouses[index].name = checkValue(req.body.name);
                warehouses[index].address = checkValue(req.body.address);
                warehouses[index].city = checkValue(req.body.city);
                warehouses[index].country = checkValue(req.body.country);
                warehouses[index].contact = {
                    name: checkValue(req.body.contact.name),
                    position: checkValue(req.body.contact.position),
                    phone: checkValue(req.body.contact.phone),
                    email: checkValue(req.body.contact.email)
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
* Delete warehouse by id
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
