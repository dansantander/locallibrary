var mongoose = require('mongoose');
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
  // Reference to the associated book
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  imprint: {type: String, required: true},
  status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
          default: 'Maintenance'},
  due_back: {type: Date, default: Date.now}
})

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/bookinstance/' + this._id;
});

BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
  // We use fromJSDate() to import a JavaScript date string and toLocaleString()
  // to output the date in  DATE_MED format in English: Oct 6th, 2020.
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);