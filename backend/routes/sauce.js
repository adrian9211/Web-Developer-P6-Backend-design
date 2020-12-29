// file contain all routes to folder controllers/stuff.js 
// That will simplified file structure
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');                             // Import auth from //middleware/auth
const multer = require('../middleware/multer-config');                  // Import multer from middleware/multer-config
const SauceCtrl = require('../controllers/sauce');

const Sauce = require('../models/sauce');

// POST Route add new sauce to database
router.post('/', auth, multer, SauceCtrl.createSauce);

//GET Route display all Sauces - Products from database
router.get('/', auth, SauceCtrl.viewAllSauces);

//GET Route display single , unique Sauces - Products from database
router.get('/:id', auth, SauceCtrl.viewSauce);

//PUT Route Update single , unique Sauces - Products in database
router.put('/:id', auth, multer, SauceCtrl.updateSauce);

//DELETE Route Remove single , unique Sauces - Products from database 
router.delete('/:id', auth, SauceCtrl.deleteSauce);

//PUT Route Assign Like to single , unique Sauces - Products from database 
//router.put('/:id/like', auth, SauceCtrl.likeSauce);

module.exports = router;