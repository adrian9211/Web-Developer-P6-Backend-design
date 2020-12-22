// file contain all routes to folder controllers/stuff.js 
// That will simplified file structure
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');                             // Import auth from //middleware/auth
const multer = require('../middleware/multer-config');                  // Import multer from middleware/multer-config
const stuffCtrl = require('../controllers/sauces');


router.get('/', auth, stuffCtrl.getAllStuff);                      // ,auth, added to each route to protect all enpoints 
router.post('/', auth, multer, stuffCtrl.createThing);             // add multer for post request auth must be first because must be authenticated at the beginning
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;