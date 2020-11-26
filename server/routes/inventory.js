const path = require("path");
const INVENTORY_FILE_PATH = "../Data/inventory.json";
const inventory = require(INVENTORY_FILE_PATH);
let router = require("express").Router();
const uuid = require("uuid").v4;
const fs = require("fs");

/*
 * GET inventory list
 */
router.get("/", (req, res) => {
  console.info(inventory);
  res.send(inventory);
});

/*
 * GET inventory item
 */
router.get("/:id", (req, res) => {
  res.send(inventory.filter((item) => (item.id = req.params.id)));
});

/**
 * POST add new inventory item
 */
router.post("/", (req, res) => {
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
});

/* Edit inventory */
router.put("/:id", (request, response) => {
  const item = inventory.some(
    (inventory) => inventory.id === request.params.id
  );

  if (item) {
    const updatedInventory = request.body;
    if (
      !updatedInventory.warehouseID &&
      !updatedInventory.warehouseName &&
      !updatedInventory.description &&
      !updatedInventory.category &&
      !updatedInventory.status &&
      !updatedInventory.quatity
    ) {
      response.status(400).json({
        msg: "All fields should be filled!",
      });
    } else {
      inventory.forEach((inventory) => {
        if (item.id === request.params.id) {
          inventory.warehouseID = updatedInventory.warehouseID;
          inventory.warehouseName = updatedInventory.warehouseName;
          inventory.description = updatedInventory.description;
          inventory.category = updatedInventory.category;
          inventory.status = updatedInventory.status;
          inventory.quantity = updatedInventory.quantity;

          response.json({
            msg: `Item was updated ${updatedInventory}`,
          });
        }
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

  if (item) {
    response.json({
      msg: "Item deleted",
      inventory: inventory.filter(
        (inventory) => inventory.id !== request.params.id
      ),
    });
  } else {
    response.status(400).json({
      msg: `No Item with the id of ${request.params.id}`,
    });
  }
});

module.exports = router;
