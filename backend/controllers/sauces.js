// File contain all links from routes.stuff.js
const Thing = require('../models/thing');
const fs = require('fs');                                 // Access to filesystem fs stands for file system

exports.createThing = (req, res, next) => {
  req.body.thing = JSON.parse(req.body.thing);            // this is a  string not an object this is why must be stringified by JSON.parse(req.body.thing)
  const url = req.protocol + '://' + req.get('host');     // request http or https protocol get and pass host
  const thing = new Thing({
    userId: req.body.thing.userId,
    name: req.body.thing.name,
    manufacturer: req.body.thing.manufacturer,
    description: req.body.thing.description,
    mainPepper: req.body.thing.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,       // url and pass to images folder and than filename ....
    heat: req.body.thing.heat,
  });
  thing.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyThing = (req, res, next) => {
  let thing = new Thing({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.thing = JSON.parse(req.body.thing);
    thing = {
      userId: req.body.thing.userId,
      name: req.body.thing.name,
      manufacturer: req.body.thing.manufacturer,
      description: req.body.thing.description,
      mainPepper: req.body.thing.mainPepper,
      imageUrl: url + '/images/' + req.file.filename,       // url and pass to images folder and than filename ....
      heat: req.body.thing.heat,
    };
  } else {
    thing = {
      userId: req.body.thing.userId,
      name: req.body.thing.name,
      manufacturer: req.body.thing.manufacturer,
      description: req.body.thing.description,
      mainPepper: req.body.thing.mainPepper,
      imageUrl: url + '/images/' + req.file.filename,       // url and pass to images folder and than filename ....
      heat: req.body.thing.heat,
    };
  }
  Thing.updateOne({_id: req.params.id}, thing).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({_id: req.params.id}).then(
    (thing) => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Thing.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};

exports.getAllStuff = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};