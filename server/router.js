
//Authentication route handlers
const Authentication = require('./controllers/authentication');
const CompanyController = require('./controllers/CompanyController');

//Passport middleware module and setup
const passport = require('passport');
const passportStrategies = require('./services/passport_strategies');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

//Custom express routing middleware that checks to see if the authenticated user is an admin
const requireAdmin = require('./services/requireAdmin')
const path       = require('path');


module.exports = function(app) {

  // using requireAuth passport middleware w/ jwt strategy to protect route
  app.get('/dashboard', requireAuth, function(req, res) {
    res.send({ copmpanies: [] });
  });

  // using requireAuth passport middleware w/ jwt strategy to protect route
  app.get('/companies', requireAuth, CompanyController.get);


  // using requireAuth passport middleware w/ jwt strategy as well as requireAdmin custom express middleware to protect route
  // must be an admin to access admin area
  app.get('/admin_area', requireAuth, requireAdmin, function(req, res, next) {
    res.send({ message: 'server response:  this GET request has been authorized for an admin' });
  });



  // using requireSignin passport middleware to authenticate for protected route using local (email/password) strategy)
  // Authentication.signin sends back JWT token to authenticated user
  app.post('/signin', requireSignin, Authentication.signin);



  // route for signing up user
  app.post('/add_company',requireAuth, CompanyController.post);


  // route for signing up user
  app.post('/signup', Authentication.signup);



  // using requireAuth passport middleware using jwt strategy as well as requireAdmin custom express middleware to protect route
  // must be an admin to activate another admin
  app.post('/admin_activation', requireAuth, requireAdmin, Authentication.admin_activation);

  // Api
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Api is ready for requests"}');
  });


  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../client/build_webpack', 'index.html'));
  });

}
