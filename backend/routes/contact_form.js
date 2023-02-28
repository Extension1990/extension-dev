const express = require('express');
const router = express.Router();

const ContactFormController = require('../controllers/contactForm');

router.post('/contact', (req, res, cb) => {
    ContactFormController.contactForm
});

module.exports = router;