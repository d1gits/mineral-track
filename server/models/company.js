const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// model definition
const companySchema = new Schema({
  assignerEmail: String,
  contactPerson: String,
  companyName: String,
  location: String,
	order: String,
  type: String
});

// Create the model class
const ModelClass = mongoose.model('company', companySchema);

// Export the model
module.exports = ModelClass;
