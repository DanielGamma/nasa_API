const express = require('express');
const router = express.Router();

// Landings controllers:
const { getAllLandings, getLandingsByName, createLanding, editLanding, deleteLanding } = require('../controllers/landings_controllers');

router.get('/:page?', getAllLandings);
router.get('/name/:name', getLandingsByName);

router.post('/create', createLanding);

router.put('/edit/:id', editLanding);

router.delete('/delete/:id', deleteLanding);


module.exports = router;