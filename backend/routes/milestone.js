/*const r = require('express').Router();
const { getMilestones, addMilestone, submitMilestone, approveMilestone, payMilestone } = require('../controllers/milestoneController');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

console.log('milestoneController types =', {
  getMilestones: typeof getMilestones,
  addMilestone: typeof addMilestone,
  submitMilestone: typeof submitMilestone,
  approveMilestone: typeof approveMilestone,
  payMilestone: typeof payMilestone,
});
console.log('authMiddleware types =', {
  requireAuth: typeof requireAuth,
  requireRole: typeof requireRole,
});


r.get('/:projectId', requireAuth, getMilestones);
r.post('/:projectId', requireAuth, requireRole('CLIENT'), addMilestone);
r.patch('/:id/submit', requireAuth, requireRole('FREELANCER'), submitMilestone);
r.patch('/:id/approve', requireAuth, requireRole('CLIENT'), approveMilestone);
r.post('/:id/pay', requireAuth, requireRole('CLIENT'), payMilestone);

module.exports = r;
jdvfjhvfd
// backend/routes/milestones.js
const r = require('express').Router();
const {
  getMilestones,
  addMilestone,
  submitMilestone,
  approveMilestone,
  payMilestone
} = require('../controllers/milestoneController');

const { protect, requireRole } = require('../middleware/authMiddleware');

// Auth + role-based routing
r.get('/:projectId', protect, getMilestones);
r.post('/:projectId', protect, requireRole('CLIENT'), addMilestone);
r.patch('/:id/submit', protect, requireRole('FREELANCER'), submitMilestone);
r.patch('/:id/approve', protect, requireRole('CLIENT'), approveMilestone);
r.post('/:id/pay', protect, requireRole('CLIENT'), payMilestone);

module.exports = r;
dkubtvhekjtvbhe
jhbh

// backend/routes/milestone.js
const r = require('express').Router();
const {
  getMilestones,
  addMilestone,
  submitMilestone,
  approveMilestone,
  payMilestone,
} = require('../controllers/milestoneController');

const { requireAuth, requireRole } = require('../middleware/authMiddleware');

// anyone authenticated can view milestones of a project
r.get('/:projectId', requireAuth, getMilestones);

// only CLIENT can create milestones on a project they own
r.post('/:projectId', requireAuth, requireRole('CLIENT'), addMilestone);

// only FREELANCER can submit their completed milestone
r.patch('/:id/submit', requireAuth, requireRole('FREELANCER'), submitMilestone);

// only CLIENT can approve a submitted milestone
r.patch('/:id/approve', requireAuth, requireRole('CLIENT'), approveMilestone);

// only CLIENT can pay an approved milestone
r.post('/:id/pay', requireAuth, requireRole('CLIENT'), payMilestone);

module.exports = r;

*/











/*const r = require('express').Router();
const { getMilestones, addMilestone, submitMilestone, approveMilestone, payMilestone } = require('../controllers/milestoneController');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

console.log('milestoneController types =', {
  getMilestones: typeof getMilestones,
  addMilestone: typeof addMilestone,
  submitMilestone: typeof submitMilestone,
  approveMilestone: typeof approveMilestone,
  payMilestone: typeof payMilestone,
});
console.log('authMiddleware types =', {
  requireAuth: typeof requireAuth,
  requireRole: typeof requireRole,
});


r.get('/:projectId', requireAuth, getMilestones);
r.post('/:projectId', requireAuth, requireRole('CLIENT'), addMilestone);
r.patch('/:id/submit', requireAuth, requireRole('FREELANCER'), submitMilestone);
r.patch('/:id/approve', requireAuth, requireRole('CLIENT'), approveMilestone);
r.post('/:id/pay', requireAuth, requireRole('CLIENT'), payMilestone);

module.exports = r;
jdvfjhvfd
// backend/routes/milestones.js
const r = require('express').Router();
const {
  getMilestones,
  addMilestone,
  submitMilestone,
  approveMilestone,
  payMilestone
} = require('../controllers/milestoneController');

const { protect, requireRole } = require('../middleware/authMiddleware');

// Auth + role-based routing
r.get('/:projectId', protect, getMilestones);
r.post('/:projectId', protect, requireRole('CLIENT'), addMilestone);
r.patch('/:id/submit', protect, requireRole('FREELANCER'), submitMilestone);
r.patch('/:id/approve', protect, requireRole('CLIENT'), approveMilestone);
r.post('/:id/pay', protect, requireRole('CLIENT'), payMilestone);

module.exports = r;
dkubtvhekjtvbhe


// backend/routes/milestone.js
const r = require('express').Router();
const {
  getMilestones,
  addMilestone,
  submitMilestone,
  approveMilestone,
  payMilestone,
} = require('../controllers/milestoneController');

const { requireAuth, requireRole } = require('../middleware/authMiddleware');

// anyone authenticated can view milestones of a project
r.get('/:projectId', requireAuth, getMilestones);

// only CLIENT can create milestones on a project they own
r.post('/:projectId', requireAuth, requireRole('CLIENT'), addMilestone);

// only FREELANCER can submit their completed milestone
r.patch('/:id/submit', requireAuth, requireRole('FREELANCER'), submitMilestone);

// only CLIENT can approve a submitted milestone
r.patch('/:id/approve', requireAuth, requireRole('CLIENT'), approveMilestone);

// only CLIENT can pay an approved milestone
r.post('/:id/pay', requireAuth, requireRole('CLIENT'), payMilestone);

module.exports = r;

*/

// backend/routes/milestone.js
const express = require('express');
const router = express.Router();

// ✅ Correct import — note the capital “C”
const {
  getMilestones,
  addMilestone,
  submitMilestone,
  approveMilestone,
  payMilestone,
} = require('../controllers/milestoneController');

const { requireAuth, requireRole } = require('../middleware/authMiddleware');

// ---------------------------
// ROUTES
// ---------------------------

// ✅ Get all milestones for a project (any authenticated user)
router.get('/:projectId', requireAuth, getMilestones);

// ✅ Client adds a milestone
router.post('/:projectId', requireAuth, requireRole('CLIENT'), addMilestone);

// ✅ Freelancer submits milestone
router.patch('/:id/submit', requireAuth, requireRole('FREELANCER'), submitMilestone);

// ✅ Client approves milestone
router.patch('/:id/approve', requireAuth, requireRole('CLIENT'), approveMilestone);

// ✅ Client pays milestone
router.post('/:id/pay', requireAuth, requireRole('CLIENT'), payMilestone);

// ---------------------------
module.exports = router;


