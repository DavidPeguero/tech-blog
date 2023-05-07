const router = require('express').Router();
const { User, Post } = require('../models');
const { findByPk } = require('../models/Post');
const withAuth = require('../middleware/auth')


//Gets all post in db and displays them 
router.get('/', async (req, res) => {
    try {
        let postData = await Post.findAll({
            include: [User]
        });
        console.log(req.session.user_id)

        if (!postData) {
            res.status(404).json(postData);
            return
        }

        let posts = postData.map((post) => post.get({ plain: true }))
        //pass the post objects to the homepage handlebars view
        
        res.render('homepage', { 
            posts,
            logged_in : req.session.logged_in,
          });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/login', async (req, res) => {
    try {
        res.render('login', {
            logged_in : req.session.logged_in
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/signup', async (req, res) => {
    try {
        res.render('signup', {
            logged_in : req.session.logged_in
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        let userData = await User.findByPk(req.session.user_id, {
            include : [Post]
        })

        let user = userData.get({plain : true});
        res.render('dashboard', {
            user,
            logged_in : req.session.logged_in,
            user_id : req.session.user_id
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/editPost', withAuth,async (req, res) => {
    try {
        let userData = await User.findByPk(req.session.user_id, {
            include : [Post]
        })

        let user = userData.get()
        res.render('dashboard', {
            user: user,
            logged_in : req.session.logged_in,
            user_id : req.session.user_id
        });
    } catch (err) {
        res.status(400).json(err);
    }
});



module.exports = router