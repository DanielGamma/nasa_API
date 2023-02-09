const express = require('express');
const router = express.Router();

// Landings controllers:
const { getAllLandings, getLandingsByName, getLandingsById, createLanding, editLanding, deleteLanding, resetLanding } = require('../controllers/landings_controllers');

router.get('/:page?', getAllLandings);
router.get('/name/:name', getLandingsByName);
router.get('/id/:id', getLandingsById);

router.post('/create', createLanding);
router.post('/reset', resetLanding)

router.put('/edit/:id', editLanding);

router.delete('/delete/:id', deleteLanding);


module.exports = router;