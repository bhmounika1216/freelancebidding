/*const { router } = require('../server');

const r = require('express').Router();

// TEMP handlers so the server starts even if controller isn't ready
r.get('/:projectId', (req, res) => res.json([{ _id: 'demo', title: 'Design', amount: 100, status: 'PENDING' }]));
r.post('/:projectId', (req, res) => res.status(201).json({ ok: true }));
r.patch('/:id/submit', (req, res) => res.json({ status: 'SUBMITTED' }));
r.patch('/:id/approve', (req, res) => res.json({ status: 'APPROVED' }));
r.post('/:id/pay', (req, res) => res.json({ status: 'PAID', paymentStatus: 'CAPTURED' }));

module.exports = router;
// backend/models/milestone.js
const { Schema, model, Types } = require('mongoose');

const milestoneSchema = new Schema({
  projectId: { type: Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['PENDING','SUBMITTED','APPROVED','PAID'], default: 'PENDING' },
  paymentStatus: { type: String, enum: ['NONE','CAPTURED','FAILED'], default: 'NONE' },
  submittedAt: Date,
  approvedAt: Date,
  paidAt: Date
}, { timestamps: true });

module.exports = model('Milestone', milestoneSchema);

const r = require('express').Router();
const {
  getMilestones,
  addMilestone,
  submitMilestone,
  approveMilestone,
  payMilestone
} = require('../controllers/milestoneController');

const { protect, requireRole } = require('../middleware/authMiddleware');

r.get('/:projectId', protect, getMilestones);
r.post('/:projectId', protect, requireRole('CLIENT'), addMilestone);
r.patch('/:id/submit', protect, requireRole('FREELANCER'), submitMilestone);
r.patch('/:id/approve', protect, requireRole('CLIENT'), approveMilestone);
r.post('/:id/pay', protect, requireRole('CLIENT'), payMilestone);

module.exports = r;
*/
// backend/models/milestone.js
const {
  getMilestones,
  addMilestone,
  submitMilestone,
  approveMilestone,
  payMilestone,
} = require('../controllers/milestoneController');

const { Schema, model, Types } = require('mongoose');

const milestoneSchema = new Schema({
  projectId:     { type: Types.ObjectId, ref: 'Project', required: true },
  title:         { type: String, required: true, trim: true },
  amount:        { type: Number, required: true, min: 0 },
  status:        { type: String, enum: ['PENDING','SUBMITTED','APPROVED','PAID'], default: 'PENDING' },
  paymentStatus: { type: String, enum: ['NONE','CAPTURED','FAILED'], default: 'NONE' },
  submittedAt:   Date,
  approvedAt:    Date,
  paidAt:        Date
}, { timestamps: true });

module.exports = model('Milestone', milestoneSchema);
