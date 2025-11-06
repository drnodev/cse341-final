const express = require('express');
const router  = express.Router();

const { list, byId, create, update, remove } = require('../controllers/contacts');

router.get('/', list)          
router.get('/:id', byId)   
router.post('/', create);
router.put('/:id', update);     
router.delete('/:id', remove);  

module.exports = router;