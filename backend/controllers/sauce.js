const Sauce = require('../models/sauce');
global.atob = require("atob");
const fs = require('fs');                                                           // Access to filesystem fs stands for file system


exports.createSauce = (req, res, next) => {                                         // Create Sauce - new product

    req.body.sauce = JSON.parse(req.body.sauce);                                    //convert string into json object
    console.log(req.body);
    const url = req.protocol + '://' + req.get('host');                             // Create URL -- required localhost


    const sauce = new Sauce({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        imageUrl: url + '/images/' + req.file.filename,
        heat: req.body.sauce.heat,
        likes: req.body.sauce.likes,
        dislikes: req.body.sauce.dislikes,
        userLiked: req.body.sauce.userLiked,                                      // Array created to see id of user who liked product
        userDisliked: req.body.sauce.userDisliked                                 // Array created to see id of user who disliked product
    });

    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Individual Sauce - Product Created!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );

    console.log("New sauce created");
};

exports.viewAllSauces = (req, res, next) => {                                   // Dispaly All Sauces from database
    Sauce.find().then(
        (sauce) => {                                  // Parametr sauce
            res.status(200).json(sauce);                // Display sauce
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );

    console.log("Display ALL SAUCES");
};

exports.viewSauce = (req, res, next) => {                                      // // Dispaly IndividualSauces from database
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {                                  // Parametr sauce
            res.status(200).json(sauce);                // Display sauce
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );

    console.log("Display Individual Sauce - Product");
};

exports.updateSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.sauce = JSON.parse(req.body.sauce)
        sauce = {
          _id: req.params.id,
          userId: req.body.sauce.userId,
          name: req.body.sauce.name,
          description: req.body.sauce.description,
          manufacturer: req.body.sauce.manufacturer,
          imageUrl: url + req.file.key,                         // Didn't attached into else section because do not require update image
          heat: req.body.sauce.heat
        }
      } else {
        sauce = {
          _id: req.params.id,
          userId: req.body.userId,
          name: req.body.name,
          description: req.body.description,
          manufacturer: req.body.manufacturer,
          heat: req.body.heat
        }
      }
  
      Sauce.updateOne({ _id: req.params.id }, sauce)
        .then(() => {
          res.status(201).json({
            message: 'Product updated!'
          })
        })
        .catch(error => {
          res.status(400).json({
            error: error
          })
        })
    })
  }
exports.deleteSauce = (req, res, next) => {

    Sauce.findOne({
        _id: req.params.id
            }).then((sauce)=>{
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {                             // fs - access to filesystem - required to delete img from local folder
                    Sauce.deleteOne({_id: req.params.id}).then(
                        () => {
                            res.status(200).json({
                                message: 'Removed!'
                            });
                        }
                    ).catch(
                        (error) => {
                            console.log(error);
                            res.status(400).json({
                                error: error
                            });
                            console.log(error);
                        });
                }
            );
        });

    console.log("Delete Individual Sauce - Product");
};

exports.likeSauce = (req, res, next) => {
    req.body = req.body
    Sauce.findOne({ 
        _id: req.params.id 
    }).then(sauce => {
        // User liked and description
      if (req.body.like == 1) {
        sauce.usersLiked
            .push(req.body.userId)
            sauce.likes += req.body.like
      } 
        else if (
        req.body.like == 0 && sauce.usersLiked
            .includes(req.body.userId)
      ) 
      {
        sauce.usersLiked
            .remove(req.body.userId)
            sauce.likes -= 1
      } 
    //   User disliked and description
      else if (req.body.like == -1) {
        sauce.usersDisliked
            .push(req.body.userId)
            sauce.dislikes += 1
      } 
      else if (
        req.body.like == 0 && sauce.usersDisliked
            .includes(req.body.userId)
      ) 
      {
        sauce.usersDisliked
            .remove(req.body.userId)
            sauce.dislikes -= 1
      }
      sauce.save().then(() => {
          res.status(201).json({
            message: 'Preference sended to the system.'
          })
        }).catch(error => {
            res.status(400).json({
            error: error
          })
        })
    })
  }

    
      