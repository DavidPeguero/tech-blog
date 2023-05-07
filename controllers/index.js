const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get('/', async (req,res) => {
    try{
      res.render('homepage')
    } catch(err){
      res.status(400).json(err)
    }
  })

module.exports = router;
