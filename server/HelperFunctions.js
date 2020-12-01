
    /**
     * @param {String} email_ 
     * @returns {String} the value email_
     */
const  checkEmail = (email_) => {
        const regex = new RegExp(/(^[\w\-]{1,}[\w\-\.^abc$]{3,}@[\w\-\.]{3,}\.\w{2,})$/, "g");
        try {
            checkValue(email_);
        }
        catch (error) {
            throw error;
        }
        email_ = email_.replace(/ /g, "");
        if (!regex.test(email_))
            throw `Error: Email Invalid`;
        else
            return email_;
    }


    /**
     * 
     * @param {String} value_
     * @throws error if value_ is null, undefined, length less than 2
     * @returns {String} the value_
     */
    const checkValue = (value_) => {
        //console.log("value_ ", value_);
        if (!value_ || value_.length < 2) {
            throw `Error: Invalid value => [ ${value_} ]`;
        }
        else
            return value_;
    }

    /**
     * 
     * @param {String} phone_
     * @throws {String} error if value is invalid
     */
    const checkPhoneNumber = (phone_) => {
        const regex = new RegExp(/^((\+\d){0,1}|\d{0,1})[(]\d{3}[)]\d{3}[-]\d{4}$/, "g");
        try {
            checkValue(phone_);
        }
        catch (error) {
            console.error(error);
            throw `Error Invalid phone => [ ${phone_} ]\n` + error;
        }

        phone_ = phone_.replace(/ /g, '');

        if (!regex.test(phone_))
            throw `Error: Invalid phone => [ ${phone_} ]`;
        else
            return phone_;
    }


    /**
     * 
     * @param {string} content_
     * @param {string} pathToFile_
     * @returns {Promise<Boolean>} a boolean
     */
const saveTofile = async (pathToFile_, content_) => {
    console.log(pathToFile_)
        const fs = require('fs');
    try {
        return new Promise((resolve, reject) => {
            try {
                fs.writeFile(pathToFile_, JSON.stringify(content_, null, 4), (error) => {
                    console.log("fs.writeFile message [null is good]: ", error);
                    if (error === null) {
                        resolve(true);
                    }
                    else {
                        console.error("Error: ", error);
                        resolve(false);
                    }
                });
            } catch (error) {
                reject(false);
            }
        });
    }
    catch (error) {
        console.error(error);
    }
    return false;
}

module.exports = { checkEmail, checkValue, checkPhoneNumber, saveTofile };