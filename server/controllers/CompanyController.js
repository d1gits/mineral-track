const Company = require('../models/company');
const config = require('../config');

const getCompanyList = function (req, res, next) {
	Company.find({}, function(err, companies) {
		res.send({ companies: companies });
	});
}

exports.get = function(req, res, next) {
  // User has been authenticated, send back token
	if (req.user.type ==='enduser') {
		getCompanyList(req,res,next)
	} else {
		Company.find({ assignerEmail: req.user.email }, function(err, companies) {
	  	res.send({ companies: companies });
		});
	}
}

exports.post = function(req, res, next) {
	console.log(req.user.email)
	const assignerEmail = req.user.email;
  const contactPerson = req.body.contactPerson;
  const companyName = req.body.companyName;
  const location = req.body.location;
  const order = req.body.order;
  const type = req.body.type;

  // If a user with email does NOT exist, create and save user record
  const company = new Company({
    assignerEmail: req.user.email,
	  contactPerson: contactPerson,
    companyName: companyName,
    location : location,
    order : order,
    type : type,
  });
  company.save(function(err) {
    if (err) { return next(err); }

    // Repond to request indicating the user was created
		Company.find({ assignerEmail: req.user.email }, function(err, companies) {
	  	res.json({ companies: companies });
		});
  });
}
