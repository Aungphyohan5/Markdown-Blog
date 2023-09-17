const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
    res.send('this is article')
})

module.exports = router