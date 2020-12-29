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
        userLiked: req.body.sauce.userLiked,
        userDisliked: req.body.sauce.userDisliked
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


    let sauce = new Sauce({ _id: req.params._id });
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.sauce = JSON.parse(req.body.sauce);
        sauce = {
            //_id: req.params._id,
            name : req.body.sauce.name,
            manufacturer : req.body.sauce.manufacturer,
            description : req.body.sauce.description,
            imageUrl : url + '/images/' + req.file.filename,
            heat : req.body.sauce.heat,
            userId : req.body.sauce.userId,
            //likes : req.body.sauce.likes,
           // dislikes : req.body.sauce.dislikes,
            //usersDisliked : req.body.sauce.usersDisliked,
            //usersLiked : req.body.sauce.usersLiked
        };
    } else{
        sauce = {
            //_id: req.params._id,
            name : req.body.name,
            manufacturer : req.body.manufacturer,
            description : req.body.description,
            imageUrl : req.body.imageUrl,
            heat : req.body.heat,
            userId : req.body.userId,
        };
    }
    Sauce.updateOne({_id: req.params.id}, sauce).then(
        () => {
            res.status(201).json({
                message: 'Individual Sauce - Product Updated!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );

    console.log("Update Individual Sauce - Product");
};

exports.deleteSauce = (req, res, next) => {

    Sauce.findOne({_id: req.params.id}).then(
        (sauce)=>{
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



    
      