var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//blog schema definition
var BlogSchema = new Schema(
  {
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
BlogSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the BlogSchema for use elsewhere.
module.exports = mongoose.model('Blog', BlogSchema);
