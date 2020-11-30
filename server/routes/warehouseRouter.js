const path = require("path");
const WAREHOUSES_FILE_PATH = './data/warehouses.json';
const warehouses = require(WAREHOUSES_FILE_PATH);
const RESOLVED_FILE_PATH = path.join(path.resolve(__dirname, WAREHOUSES_FILE_PATH));
let router = require('express').Router();
const uuid = require('uuid').v4;
const tools = require('../HelperFunctions.js');

/* 
* GET warehouses list
*/
router.get('/', (req, res) => {
    //console.info('get \'/\'');
    res.send(warehouses);
});

/* 
* GET warehouses list of names
*/
router.get('/names', (req, res) => {
    //console.info('get \'/names\'');
    const result = warehouses.map(item => item.name); 
    //console.debug(result);
    res.send(result);

});

/*
* GET warehouse by id
*/
router.get('/:id', (req, res) => {
    //console.info('get \'/:id\'');
    console.info(warehouses.filter(item => item.id === req.params.id));
    
    res.send(warehouses.filter(item => item.id === req.params.id));
});

/**
 * POST add new warehouses item
 */
router.post('/', (req, res) => {

    let data = createObject(req.body);
    data.id = uuid();
    warehouses.push(data);

    tools.saveTofile(RESOLVED_FILE_PATH, JSON.stringify(warehouses))
        ?
        res.status(200).send({ warehouse: data })
        :
        res.status(500);
});


/*
* Edit warehouse
*/
router.put('/', async (req, res) => {

    //console.info("PUT ", req.body);
    const warehouseFound = warehouses.filter(item => item.id === req.body.id)[0];
    if (!warehouseFound) {
        res.status(404).send(`Warehouse id: [ ${req.body.id} ] not found`);
        return;
    }
    
    let data = createObject(req.body);
    const objIndex = warehouses.indexOf(warehouseFound);
    warehouses.splice(objIndex, 1, data);
    //console.log(objIndex);
    await tools.saveTofile(RESOLVED_FILE_PATH, warehouses)
        ?
        res.status(200).send({ item: data })
        :
        res.status(500);        
    
});


/*
* DELETE warehouse by id
*/
router.delete('/:id', (req, res) => {
    console.debug(req.params);
    let deletedItem = {};
    let found = false;
    let index = 0;
    for (; index < warehouses.length; ++index) {
        
        console.debug(warehouses[index].id, req.params.id);

        if (warehouses[index].id === req.params.id) {
            deletedItem = warehouses[index];
            //console.log(warehouses.length);
            delete warehouses[index];
            //console.log(warehouses.length);
        }
        break;
    }

    if(!found) {
        res.status(404).send({ error: "Warehouse not found" });
        return;
    }
    const result = tools.saveTofile(RESOLVED_FILE_PATH, JSON.stringify(warehouses));
    if (result) {
        res.status(200).send({ deleted: deletedItem });
    }
    
});


/**
 * 
 * @param {Object} body_ 
 */
function createObject(body_) {
    try {
        //console.log("body_ ", body_);
        const data = {
            
            id: tools.checkValue(body_.id),
            name: tools.checkValue(body_.name),
            address: tools.checkValue(body_.address),
            city: tools.checkValue(body_.city),
            country: tools.checkValue(body_.country),
            contact: {
                name: tools.checkValue(body_.contact.name),
                position: tools.checkValue(body_.contact.position),
                phone: tools.checkPhoneNumber(body_.contact.phone),
                email: tools.checkEmail(body_.contact.email)
            }
        };
        return data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = router;
