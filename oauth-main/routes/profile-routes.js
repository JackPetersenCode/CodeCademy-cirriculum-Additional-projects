const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('this is your profile - ' + req.user.username);
})

module.exports = router;