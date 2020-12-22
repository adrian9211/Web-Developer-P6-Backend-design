const multer = require('multer');                               // Import multer package after instalation  npm install --save multer

const MIME_TYPES = {                                            // expected extensions
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({                            // Describe how to save files to disk
  destination: (req, file, callback) => {                       // Destination option 
    callback(null, 'images');                                   // Pass error or not and second pass folder in this case images
  },
  filename: (req, file, callback) => {                          // Destination Filename , take request file and callback 
    const name = file.originalname.split(' ').join('_');        // give filename  -- any empty space, white space will be replaced by underscore _
    const extension = MIME_TYPES[file.mimetype];                // give extension - descripe expected filetypes and assigne to MIME_TYPES
    callback(null, name + Date.now() + '.' + extension);        // call null errror, name with datastamp and file extension
  }
});

module.exports = multer({storage: storage}).single('image');    // export middleware