'use strict';

const users = require('./users.js');

module.exports = (req, res, next) => {

  // req.headers.authorization should be : "Bearer slfldsf.alfjdslfjdsflj.sflasdjfdlsj"

  if (!req.headers.authorization) { next('Invalid Login'); return; }

  // Pull out just the encoded part by splitting the header into an array on the space and popping off the 2nd element
  let token = req.headers.authorization.split(' ').pop();

  // Notice that here, we're catching the errors from the user model.
  users.authenticateToken(token)
    .then(validUser => {
      // Given a valid user, add it to the request object so that other middleware/request handlers can see and evaluate the user
      req.user = validUser;
      next();
    })
    .catch(err => next('Invalid Login'));

}
