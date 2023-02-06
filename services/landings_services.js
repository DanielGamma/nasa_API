const Landing = require('../models/landings_models');

// const { validateNumber } = require('../utils/validations');
// const {CustomError} = require('../utils/errors');

const getAll = async () => {
    try {
        const landings = await Landing.find({}).sort('name');
        return landings
    }
    catch (error) {
        return error
    }
}

const getByName = async (name) => {
    try {
        const regex = new RegExp(name);
        const landings = await Landing.find({ name: { $regex: regex, $options: 'i' } }).limit(10).sort('name');
        return landings
    } catch (error) {
        return error
    }
}

const getNumberOfDocuments = async () => {
    try {
        const count = await Landing.countDocuments({});
        return count
    } catch (error) {
        return error
    }
}

const getPaginatedLandings = async (field, order, page) => {
    try {
        const landings = await Landing.find({}).sort({ [field]: order }).skip((page - 1) * 10).limit(10);
        return landings
    } catch (error) {
        return error
    }
}


module.exports = {
    getAll,
    getByName,
    getNumberOfDocuments,
    getPaginatedLandings
}