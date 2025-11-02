const express = require('express');
const router = express.Router();

const { list, byId} = require('../controllers/contacts');


router.get('/', list)          
router.get('/:id', byId)       



module.exports = router;