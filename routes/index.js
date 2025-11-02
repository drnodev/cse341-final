const router    = require('express').Router();
const contacs   = require('./contacts')

router.use('/contacts', contacs)

module.exports = router;