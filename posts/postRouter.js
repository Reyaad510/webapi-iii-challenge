const express = require('express');

const Posts = require('./postDb');

const router = express.Router();

router.get('/', async (req, res) => {
   try {
    const posts = await Posts.get();
    res.status(200).json(posts);
   } catch(err) {
       res.status(500).json({
           message: "Error retrieving the posts"
       })
   }
});

router.get('/:id', validatePostId, (req, res) => {
    res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {

});

router.put('/:id', validatePostId, (req, res) => {

});

// custom middleware

async function validatePostId(req, res, next) {
    try {
        const { id } = req.params;
        const post = await Posts.getById(id);

        if(post) {
            req.post = post;
            next();
        } else {
            res.status(500).json({ message: 'Id not found!' })
        }
    } catch(err) {
        res.status(500).json({ message: 'Failed to process' })
    }

};

module.exports = router;