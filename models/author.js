var mongoose = require('mongoose');
const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

// Schema initialization
var AuthorSchema = new Schema({
  first_name: {type: String, required: true, maxlength: 100},
  family_name: {type: String, required: true, maxlength: 100},
  date_of_birth: {type: Date},
  date_of_death: {type: Date},
});

// Virtual for author's full name
AuthorSchema
  .virtual('name')
  .get(function() {
    return this.family_name + ',' + this.first_name;
  });

// Virtual for author's lifespan
AuthorSchema
  .virtual('lifespan')
  .get(function() {
    // The output will be: (Thu Jan 01 1920 17:23:24 GMT-0636 (Central Standard Time) - Sun Apr 05 1992 18:00:00 GMT-0600 (Central Standard Time))
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
  });

// Virtual for author's challenge lifespan
AuthorSchema.virtual('lifespan2').get(function() {
  var lifetime_string = '';
  if (this.date_of_birth) {
    lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  }
  lifetime_string += ' - ';
  if (this.date_of_death) {
    lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
  }
  return lifetime_string;
});

// Virtual for author's URL
AuthorSchema
  .virtual('url')
  .get(function() {
    return '/catalog/author/' + this._id;
  });

// Export model
module.exports = mongoose.model('Author', AuthorSchema);
