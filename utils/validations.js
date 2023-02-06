// const { ValidationError } = require("./errors");

const validateNumber = (mass) => {
    const regex = /^\d+$/g;
    return regex.test(Number(mass))
}

const validateName = (name) => {
    const regex = /^[\w\s-]+$/gi;
    return regex.test(name)
}

const validadteCoords = (coord) => {
    const regex = /^[\d]+\.[\d]+$/gi;
    return regex.test(parseFloat(coord))
}

const validateLandingDocument = (doc) => {
    if (!doc.name) {
        console.log("Invalid name");
        return false
    }

    if (!doc.id) {
        console.log('Invalid id')
        return false
    }

    if (!doc.recclass) {
        console.log('Invalid class')
        return false
    }

    if (!doc.mass) {
        console.log('Invalid mass')
        return false
    }

    if (!doc.year) {
        console.log('Invalid year')
        return false
    }

    if (!doc.reclat) {
        console.log('Invalid lat')
        return false
    }

    if (!doc.reclong) {
        console.log('Invalid long')
        return false
    }
    else {
        return true
    }

}
const validateNeaDocument = (doc) => {
    const keys = Object.keys(doc);
    const result = keys.filter(key => !doc[key]);
    return result.length < 1 ? true : false
}

const capitalizeString = (string) => {
    const newString = string.split('').map((letter, index) => {
        return index === 0 ? letter.toUpperCase() : letter.toLowerCase();
    });
    return newString.join('')
}

const validateUserName = (name) => {
    const regex = /^[\w\.\s]{0,20}$/gi;
    return regex.test(name);
}

const validateUserEmail = (email) => {
    const regex = /^[\w\.\-]+@[\w\.\-]+\.[\w]{1,4}$/gi;
    return regex.test(email);
}

const validateUserPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.:\-_,;+*/\\=])[A-Za-z\d@$!%*?&.:\-_,;+*/\\=]{8,50}$/g;
    return regex.test(password);
}

module.exports = {
    validateNumber,
    validateName,
    validadteCoords,
    validateLandingDocument,
    validateNeaDocument,
    capitalizeString,
}