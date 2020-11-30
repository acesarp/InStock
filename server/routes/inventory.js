const path = require("path");
const INVENTORY_FILE_PATH = path.join(__dirname, "./data/inventory.json");
let router = require("express").Router();
const uuid = require("uuid").v4;
const fs = require("fs");

const loadInventories = () => {
  const inventories = fs.readFileSync(INVENTORY_FILE_PATH);
  return JSON.parse(inventories);
}
const inventory = loadInventories();

function writeInventories(data) {
  fs.writeFileSync(INVENTORY_FILE_PATH, JSON.stringify(data));
}
/*
 * GET inventory list
 */
router.get("/", (req, res) => {
  res.send(loadInventories());
});

/*
 * GET inventory item
 */
router.get("/:id", (req, res) => {
  let item = inventory.filter((item) => (item.id === req.params.id));
  if (!item[0]) {
      res.status(404).send({ error: `Item with id: ${req.body.id} not found` });
      return;
  } else {
      res.send(item);
  }
});

/**
 * POST add new inventory item
 */
router.post("/", (req, res) => {
  const updatedInventory = req.body;
  if (
    !updatedInventory.warehouseID ||
    !updatedInventory.warehouseName ||
    !updatedInventory.itemName ||
    !updatedInventory.description ||
    !updatedInventory.category ||
    !updatedInventory.status ||
    !updatedInventory.quantity
  ) {
    res.status(400).json({
      msg: "All fields should be filled!",
    });
  } else {
    let data = {
      id: uuid(),
      warehouseID: req.body.warehouseID,
      warehouseName: req.body.warehouseName,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      quantity: req.body.quantity,
    };

    inventory.push(data);
    try {
      fs.writeFile(INVENTORY_FILE_PATH, JSON.stringify(inventory), () => {
        res.status(200).send(data);
      });
    } catch (error) {
      res.sendStatus(500);
    }
  }
});

/* Edit inventory */
router.put("/:id", (request, response) => {
  let inventories = loadInventories();
  const item = inventories.some(
    (inventory) => inventory.id === request.params.id
  );

  if (item) {
    const updatedInventory = request.body;
    if (
      !updatedInventory.warehouseID ||
      !updatedInventory.warehouseName ||
      !updatedInventory.itemName ||
      !updatedInventory.description ||
      !updatedInventory.category ||
      !updatedInventory.status ||
      !updatedInventory.quantity
    ) {
      response.status(400).json({
        msg: "All fields should be filled!",
      });
    } else {
      inventories.forEach((inventory) => {
        if (inventory.id === request.params.id) {
          inventory.warehouseID = updatedInventory.warehouseID;
          inventory.warehouseName = updatedInventory.warehouseName;
          inventory.description = updatedInventory.description;
          inventory.category = updatedInventory.category;
          inventory.status = updatedInventory.status;
          inventory.quantity = updatedInventory.quantity;
        }
      });
      // writeInventories(inventories);
      writeInventories(inventories);
      response.json({
        msg: `Item was updated ${JSON.stringify(updatedInventory)}`,
      });
    }
  } else {
    response.status(400).json({
      msg: `No item with the id ${request.params.id}`,
    });
  }
});

/*Making a DELETE request */
router.delete("/:id", (request, response) => {
  const item = inventory.some(
    (inventory) => inventory.id === request.params.id
  );
  let inventoryDeleted = [];

  if (item) {
    inventoryDeleted = inventory.filter(
      (inventory) => inventory.id !== request.params.id
    );
    fs.writeFile(INVENTORY_FILE_PATH, JSON.stringify(inventoryDeleted), () => {
      console.log("file written");
      response.json({
        msg: "Item deleted",
        inventory: loadInventories(),
      });
    });
  } else {
    response.status(400).json({
      msg: `No Item with the id of ${request.params.id}`,
    });
  }
});

module.exports = router;
