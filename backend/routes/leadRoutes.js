const express = require('express');
const router = express.Router();
const {
  getLeads,
  searchLeads,
  getStats,
  getLead,
  createLead,
  updateLead,
  deleteLead,
} = require('../controllers/leadController');

// NOTE: /stats and /search must come before /:id to avoid route conflicts
router.get('/stats', getStats);
router.get('/search', searchLeads);

router.route('/').get(getLeads).post(createLead);
router.route('/:id').get(getLead).put(updateLead).delete(deleteLead);

module.exports = router;
