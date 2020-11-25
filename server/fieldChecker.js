
/**
 * 
 * @param {String} email_ 
 */
const emailChecker = (email_) => {
    const regex = new RegExp("(^[\w\-]{1,}[\w\-\.^abc$]{3,}@[\w\-\.]{3,}\.\w{2,})$", "g");
    try {
        checkValue(email_);
    }
    catch (err) {
        throw err;
    }
    email_.replace(/ /g, "");
    if (!regex.test(email_))
        throw `Invalid`;
    else
        return email_;
}


/**
 * 
 * @param {String} value_
 * @throws error if value_ is null, undefined, length less than 2 
 */
const checkValue = (value_) => {
    if (value_ || value_.length < 2)
        throw `Invalid`;
    else
        return value_;
};


/**
 * 
 * @param {String} phone_
 */
const checkPhoneNumber = (phone_) => {
    const regex = new RegExp("^\d{0,1}[(]\d{3}[)]\d{3}[-]\d{4}$", "g");
    try {
        checkValue(phone_);
    }
    catch (err) {
        throw err;
    }
    phone_.replace(/ /g, "");
    if (!regex.test(phone_))
        throw `Invalid`;
    else
        return phone_;
};

module.exports =  { emailChecker, checkValue, checkPhoneNumber }
