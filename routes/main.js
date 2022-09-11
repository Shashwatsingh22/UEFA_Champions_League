const express = require('express');
const router = express.Router();


//Importing Controllers
const mainController = require('../controller/main');

router.get('/nil',mainController.nil);

router.get('/playerName',mainController.serachByPlayerProfile);

router.get('/clubName',mainController.serachByClubName);

router.get('/clubNamesPos',mainController.clubNamesAndPos);

router.get('/heatmap',mainController.heatMap);

module.exports = router;