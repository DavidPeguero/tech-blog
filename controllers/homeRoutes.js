const router = require('express').Router();
const { User, Post } = require('../models');


//Gets all post in db and displays them 
router.get('/', async (req, res) => {
    try {
        let postData = await Post.findAll({
            include: [User]
        });

        if (!postData) {
            res.status(404).json(postData);
            return
        }

        let posts = postData.map((post) => post.get({ plain: true }))
        //pass the post objects to the homepage handlebars view
        res.render('homepage', { posts });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(400).json(err);
    }
});




module.exports = router