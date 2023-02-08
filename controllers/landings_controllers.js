const Landing = require('../models/landings_models');
const { getAll, getByName, getNumberOfDocuments, getPaginatedLandings } = require('../services/landings_services');
const { validateNumber, validateLandingDocument } = require('../utils/validations');
const { backup } = require("../utils/backup.js")
// const { CustomError } = require('../utils/errors');

const getAllLandings = async (req, res, next) => {
    try {
        const { field, order } = req.query;
        const page = req.params.page;
        let count = null;
        let landings
        if (page) {
            count = await getNumberOfDocuments();
            landings = await getPaginatedLandings(field, order, page);
        } else {
            count = await getNumberOfDocuments();
            landings = await getAll();
        }

        if (!landings || landings.length < 1) {
            return res.status(400).json({ response: false, message: 'No landings found' });
        }
        res.status(200).json({ response: true, count: count, landings });
    }
    catch (error) {
        console.log(error);
    }
}

const getLandingsByName = async (req, res, next) => {
    try {
        const name = req.params.name;
        const landings = await getByName(name);
        if (!landings || landings.length < 1) {
            return res.status(400).json({ response: false, message: 'No landings with such parameters' });
        }
        res.status(200).json({ response: true, count: landings.length, landings });
    }
    catch (error) {
        console.log(error);
    }
}

const createLanding = async (req, res, next) => {
    try {
        if (!validateLandingDocument(req.body)) {
            return res.status(400).json({ response: false, message: 'Invalid parameters' })
        }
        const landing = await Landing.create(req.body);
        if (!landing) {
            return res.status(400).json({ response: false, message: 'Landing not created' })
        }
        res.status(201).json({ response: true, landing });
    }
    catch (error) {
        console.log(error)
    }
}

const editLanding = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!validateLandingDocument(req.body)) {
            return res.status(400).json({ response: false, message: 'Invalid parameters' })
        }
        const landings = await Landing.findOneAndUpdate({ id: id }, req.body, { new: true });
        if (!landings) {
            return res.status(400).json({ response: false, message: 'No landings with such parameters' });
        }
        res.status(200).json({ response: true, landings });
    }
    catch (error) {
        console.log(error)
    }
}

const deleteLanding = async (req, res, next) => {
    try {
        const id = req.params.id;
        const landing = await Landing.findOneAndDelete({ id: id });
        if (!landing || landing.length < 1) {
            return res.status(400).json({ response: false, message: 'No landings with such parameters' });
        }
        res.status(200).json({ response: true, landing });
    }
    catch (error) {
        console.log(error)
    }
}

const resetLanding = async (req, res, next) => {
    try {
        const clearLanding = await Landing.deleteMany({});
        const landing = await Landing.insertMany(backup);
        res.status(201).json({ response: true, landing });
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllLandings,
    getLandingsByName,
    createLanding,
    editLanding,
    deleteLanding,
    resetLanding
}