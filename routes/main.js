const express = require('express');
const router = express.Router();


//Importing Controllers
const mainController = require('../controller/main');

router.get('/nil',mainController.nil);

router.get('/playerName',mainController.serachByPlayerProfile);

router.get('/clubName',mainController.serachByClubName);

// router.post('/startProcess',checkPage.isPageOnNotion,checkPage.isPageOnConf,mainController.sendPage2Confluence);

module.exports = router;