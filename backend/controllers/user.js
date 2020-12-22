// Controller for user autentication app
const bcrypt = require('bcrypt');                                       // Import bcrypt
const User = require('../models/user');                                 // Import user.js from models
const jwt = require('jsonwebtoken');                                    // Import jsonwebtoken - required to token auth

//Implement the signup function
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(                            // 10 represents length of hash required
      (hash) => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save().then(
          () => {
            res.status(201).json({
              message: 'User added successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({                                      // 500 Server error
              error: error
            });
          }
        );
      }
    );
  };

//Implement the login function
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(                   // Check if user exist in database -- verify by email
    (user) => {
      if (!user) {
        return res.status(401).json({                             // If no user in database return User not found!
          error: new Error('User not found!')
        });
      }
      bcrypt.compare(req.body.password, user.password).then(      // When user exist compare password with hash into database
        (valid) => {
          if (!valid) {                                           // If not valid return 401 error and message incorect password
            return res.status(401).json({
              error: new Error('Incorrect password!')
            });
          }
          const token = jwt.sign(
            { userId: user._id },
            'RANDOM_NEW_TOKEN_ASSIGNED',
            { expiresIn: '24h' });
          res.status(200).json({                                  // If passeord correct send res 200 and auth token
            userId: user._id,
            token: token
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({                                  // error handling if server error 500 return error
            error: error
          });
        }
      );
    }
  ).catch(
    (error) => {
      res.status(500).json({                                      // error handling if server error 500 return error
        error: error
      });
    }
  );
}