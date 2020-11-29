export default class WareHouseModel {

    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} address 
     * @param {string} city 
     * @param {string} country 
     * @param {{ name:string, position:string, phone:string, email:string }} contact
     */
    constructor(id, name, address, city, country, contact) {

        this.id = id;
        this.name = name;
        this.address = address;
        this.city = city;
        this.country = country;
        this.contact = contact;

    };

    stringify() {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            address: this.address,
            city: this.city,
            country: this.country,
            contact: {
                name: this.contact.name,
                position: this.contact.position,
                phone: this.contact.phone,
                email: this.contact.email
            }
        });
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            address: this.address,
            city: this.city,
            country: this.country,
            contact: {
                name: this.contact.name,
                position: this.contact.position,
                phone: this.contact.phone,
                email: this.contact.email
            }
        };
    }
}

