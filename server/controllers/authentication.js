const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp, role: user.role }, config.secret);
}

function strippedUser(user) {
  return {email: user.email, companyName: user.companyName, name: user.name, location: user.location, type: user.type};
}

exports.signin = function(req, res, next) {
  // User has been authenticated, send back token
  res.send({ token: tokenForUser(req.user), user: strippedUser(req.user) });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const companyName = req.body.companyName;
  const name = req.body.name;
  const location = req.body.location;
  const type = req.body.type;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password,
      companyName : companyName,
      name : name,
      location : location,
      type : type,
      role: 'user'
    });
    console.log(user)
    user.save(function(err) {
      if (err) { return next(err); }

      // Repond to request indicating the user was created
      res.json({ token: tokenForUser(user), user: strippedUser(user) });
    });
  });
}


exports.admin_activation = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if an user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If an user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save record for admin
    const user = new User({
      email: email,
      password: password,
      role: 'admin'
    });

    user.save(function(err) {
      if (err) { return next(err); }

      // Repond to request indicating the admin was created
      // res.send({});
    });
  });
}
