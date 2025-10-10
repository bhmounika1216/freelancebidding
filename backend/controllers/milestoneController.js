const Milestone = require('../models/milestone');
const Project = require('../models/project');

// GET /api/milestones/:projectId
const getMilestones = async (req, res) => {
  try {
    const items = await Milestone.find({ projectId: req.params.projectId }).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/milestones/:projectId
const addMilestone = async (req, res) => {
  try {
    const { title, amount } = req.body;
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (String(project.userId) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to add milestones to this project' });
    }

    const ms = await Milestone.create({ projectId: project._id, title, amount });
    res.status(201).json(ms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/milestones/:id/submit
const submitMilestone = async (req, res) => {
  try {
    const ms = await Milestone.findById(req.params.id);
    if (!ms) return res.status(404).json({ message: 'Milestone not found' });
    if (ms.status !== 'PENDING') return res.status(400).json({ message: 'Already processed' });

    ms.status = 'SUBMITTED';
    ms.submittedAt = new Date();
    await ms.save();
    res.status(200).json(ms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/milestones/:id/approve
const approveMilestone = async (req, res) => {
  try {
    const ms = await Milestone.findById(req.params.id).populate('projectId');
    if (!ms) return res.status(404).json({ message: 'Milestone not found' });
    if (ms.status !== 'SUBMITTED') return res.status(400).json({ message: 'Must be submitted first' });

    if (String(ms.projectId.userId) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to approve' });
    }

    ms.status = 'APPROVED';
    ms.approvedAt = new Date();
    await ms.save();
    res.status(200).json(ms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/milestones/:id/pay
const payMilestone = async (req, res) => {
  try {
    const ms = await Milestone.findById(req.params.id).populate('projectId');
    if (!ms) return res.status(404).json({ message: 'Milestone not found' });
    if (ms.status !== 'APPROVED') return res.status(400).json({ message: 'Approve first' });

    if (String(ms.projectId.userId) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to pay' });
    }

    ms.status = 'PAID';
    ms.paymentStatus = 'CAPTURED';
    ms.paidAt = new Date();
    await ms.save();

    res.status(200).json(ms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getMilestones,
  addMilestone,
  submitMilestone,
  approveMilestone,
  payMilestone,
};
