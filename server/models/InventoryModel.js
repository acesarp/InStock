export default class InventoryModel {

    /**
     * 
     * @param {string} id 
     * @param {string} warehouseID
     * @param {string} warehouseName
     * @param {string} itemName
     * @param {string} category
     * @param {string} status
     * @param {Number} quantity
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

    stringify() {
        return JSON.stringify({
            id: this.id,
            warehouseID: this.warehouseID,
            warehouseName: this.warehouseName,
            itemName: this.itemName,
            description: this.description,
            category: this.category,
            status: this.status,
            quantity: this.quantity
        });
    }

    toJSON() {
        return {
            id: this.id,
            warehouseID: this.warehouseID,
            warehouseName: this.warehouseName,
            itemName: this.itemName,
            description: this.description,
            category: this.category,
            status: this.status,
            quantity: this.quantity
        };
    }
}

