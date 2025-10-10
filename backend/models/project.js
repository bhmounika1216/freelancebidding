// backend/models/project.js
const { Schema, model, Types } = require('mongoose');

const projectSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },  // or String if you aren’t using User yet
  title:   { type: String, required: true },
  description: String,
  skills:  [String],
  budgetMin: Number,
  budgetMax: Number,
  status: { type: String, default: 'OPEN' },
  deadline: Date,
}, { timestamps: true });

module.exports = model('Project', projectSchema);
