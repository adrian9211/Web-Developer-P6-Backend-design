/*Checks user credentials,
token: string } returning the user's _id
from the database and a
signed JSON web token
(also containing the user's
_id). */

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');                  // Decode token using jwt package -- token, must be verified and '' string
    const userId = decodedToken.userId;                                             // extract user id from decoded token
    if (req.body.userId && req.body.userId !== userId) {                            // if userID is in requested body will we decoded
      throw 'Invalid user ID';                                                      // if no return error -- Invalid user ID
    } else {
      next();                                                                       // if true go to next() function
    }
  } catch {
    res.status(401).json({                                                          // Return error if problem with server
      error: new Error('Invalid request!')
    });
  }
};