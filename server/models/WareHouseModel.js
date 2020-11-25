export class WareHouseModel {

    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} address 
     * @param {string} city 
     * @param {string} country 
     * @param {{ name:string, position:string, phone:string, email:string }} contact
     */
    constructor(id, name, address, city, country, contact = { name: null, position: null, phone: null, email: null }) {
        
        this.id = id;
        this.name = name
        this.address = address;
        this.city = city;
        this.country = country;
        this.contact = contact;
    
    };
}

