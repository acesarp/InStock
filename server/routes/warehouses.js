const path = require("path");
const WAREHOUSES_FILE_PATH = path.join(__dirname, "./data/warehouses.json");
const warehouses = require(WAREHOUSES_FILE_PATH);
let router = require("express").Router();
const uuid = require("uuid").v4;
const fs = require("fs");
const {
  checkEmail,
  checkValue,
  checkPhoneNumber,
} = require("../HelperFunctions.js");

const INVENTORY_FILE_PATH = path.join(__dirname, "./data/inventory.json");
const loadInventories = () => {
  const inventories = fs.readFileSync(INVENTORY_FILE_PATH);
  return JSON.parse(inventories);
};

/*
 * GET warehouses list
 */
router.get("/", (req, res) => {
  res.send(warehouses);
});

/*
 * GET warehouses list of names
 */
router.get("/names", (req, res) => {
  const result = warehouses.map((item) => item.name);
  res.send(result);
});

/*
 * GET warehouse by id
 */
router.get("/:id", (req, res) => {
  let item = warehouses.filter((item) => item.id === req.params.id);
  if (!item[0]) {
    res
      .status(404)
      .send({ error: `Warehosue with id: ${req.body.id} not found` });
    return;
  } else {
    res.send(item);
  }
});

/*
 * GET inventory by warehouse id
 */
router.get("/:id/inventory", (req, res) => {
  let item = warehouses.filter((item) => item.id === req.params.id);
  if (!item[0]) {
    res
      .status(404)
      .send({ error: `Warehosue with id: ${req.body.id} not found` });
    return;
  } else {
    const inventory = loadInventories();
    res.send(inventory.filter((item) => item.warehouseID === req.params.id));
  }
});

/**
 * POST add new warehouses item
 */
router.post("/", (req, res) => {
  console.log(req.body);
  try {
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
        email: checkEmail(req.body.contact.email),
      },
    };
    warehouses.push(data);
    try {
      fs.writeFile(WAREHOUSES_FILE_PATH, JSON.stringify(warehouses), (err) => {
        res.status(200).send(data);
      });
    } catch (error) {
      res.sendStatus(500);
    }
  } catch (error) {
    res.status(400).json({
      error:
        "Invalid property or properties. Please check body and re-send request.",
    });
  }
});

/*
 * EDIT warehouse
 */
router.put("/", (req, res) => {
  let found = false;
  let index = 0;
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
          email: checkEmail(body.contact.email),
        };
        break;
      } catch (err) {
        res.status(404).send({ error: "Invalid request" });
        return;
      }
    }
  }

  if (!found) {
    res
      .status(404)
      .send({ error: `Warehouse with id: ${req.body.id} not found` });
    return;
  }
  try {
    fs.writeFile(WAREHOUSES_FILE_PATH, JSON.stringify(warehouses), () => {
      res.send({ saved: warehouses[index] });
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

/*
 * Delete warehouse by id
 */
router.delete("/:id", (request, response) => {
  const item = warehouses.some(
    (warehouse) => warehouse.id === request.params.id
  );
  let warehouseDeleted = [];

  if (item) {
    warehouseDeleted = warehouses.filter(
      (warehouse) => warehouse.id !== request.params.id
    );
    fs.writeFile(WAREHOUSES_FILE_PATH, JSON.stringify(warehouseDeleted), () => {
      console.log("file written");
      response.json({
        msg: "Item deleted",
      });
    });
  } else {
    response.status(400).json({
      msg: `No Item with the id of ${request.params.id}`,
    });
  }
});

module.exports = router;
