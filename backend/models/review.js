/*const { Schema, model, Types } = require('mongoose');

const reviewSchema = new Schema({
  projectId: { type: Types.ObjectId, ref: 'Project', required: true },
  fromUserId: { type: Types.ObjectId, ref: 'User', required: true },
  toUserId: { type: Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min:1, max:5, required: true },
  comment: { type: String, maxlength: 500 }
}, { timestamps: true });

module.exports = model('Review', reviewSchema);
*/
const { Schema, model, Types } = require('mongoose');

const reviewSchema = new Schema({
  projectId:  { type: Types.ObjectId, ref: 'Project', required: true },
  fromUserId: { type: Types.ObjectId, ref: 'User', required: true },
  toUserId:   { type: Types.ObjectId, ref: 'User', required: true },
  rating:     { type: Number, min: 1, max: 5, required: true },
  comment:    { type: String, maxlength: 500 }
}, { timestamps: true });

module.exports = model('Review', reviewSchema);
