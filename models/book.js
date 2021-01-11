var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Schema initialization
var BookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
  summary: {type: String, required: true},
  isbn: {type: String, required: true},
  genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
});

// Virtual for books's URL
AuthorSchema
  .virtual('url')
  .get(function() {
    return '/catalog/book' + this._id;
  });

// Export model
model.exports = mongoose.model('Book', BookSchema);