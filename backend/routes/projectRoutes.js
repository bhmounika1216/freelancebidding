/*const router = require('express').Router();
const {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectsController');

// Get all projects
router.get('/', getProjects);

// Get single project
router.get('/:id', getProjectById);

// Create project
router.post('/', addProject);

// Update project
router.put('/:id', updateProject);

// Delete project
router.delete('/:id', deleteProject);

module.exports = router;
jhdfgsudgc
const router = require('express').Router();
const { requireAuth, requireRole } = require('../middleware/authMiddleware');
const {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectcontroller'); // <-- fixed filename

// Get all projects (auth required)
router.get('/', requireAuth, getProjects);

// Get single project
router.get('/:id', requireAuth, getProjectById);

// Create project (client only)
router.post('/', requireAuth, requireRole('CLIENT'), addProject);

// Update project (client only)
router.put('/:id', requireAuth, requireRole('CLIENT'), updateProject);

// Delete project (client only)
router.delete('/:id', requireAuth, requireRole('CLIENT'), deleteProject);

module.exports = router; 
// backend/routes/projectRoutes.js
dfkgv nk
const express = require('express');
const router = express.Router();

// ✅ Corrected controller import (case-sensitive!)
const {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectsController');

// ✅ Optional auth middleware if your routes require login
const { requireAuth } = require('../middleware/authMiddleware');

// ---------------------------
// ROUTES
// ---------------------------

// ✅ Get all projects (authenticated users)
router.get('/', requireAuth, getProjects);

// ✅ Get a single project by ID
router.get('/:id', requireAuth, getProjectById);

// ✅ Create a new project (CLIENT role ideally)
router.post('/', requireAuth, addProject);

// ✅ Update existing project
router.put('/:id', requireAuth, updateProject);

// ✅ Delete a project
router.delete('/:id', requireAuth, deleteProject);

// ---------------------------
module.exports = router;

*/
// backend/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectsController');
const { requireAuth } = require('../middleware/authMiddleware');

// Routes
router.get('/', requireAuth, getProjects);
router.get('/:id', requireAuth, getProjectById);
router.post('/', requireAuth, addProject);
router.put('/:id', requireAuth, updateProject);
router.delete('/:id', requireAuth, deleteProject);

module.exports = router;
