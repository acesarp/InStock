export class InventoryModel {

    /**
     * 
     * @param {string} id 
     * @param {string} warehouseID
     * @param {string} warehouseName
     * @param {string} itemName
     * @param {string} category
     * @param {string} status
     * @param {string} quantity
     */
    constructor(id, warehouseID, warehouseName, itemName, description, category, status, quantity) {

        this.id = id;
        this.warehouseID = warehouseID;
        this.warehouseName = warehouseName;
        this.itemName = itemName;
        this.description = description;
        this.category = category;
        this.status = status;
        this.quantity = quantity;
    };
}

