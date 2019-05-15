const express = require('express');

const Posts = require('./postDb');

const router = express.Router();


// Read - Obtain all posts

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

// Obtain specific posts

router.get('/:id', validatePostId, (req, res) => {
    res.status(200).json(req.post);
});


// Delete specific post

router.delete('/:id', validatePostId, async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        if (count > 0) {
          res.status(200).json({ message: 'The post has been deleted' });
        } else {
          res.status(404).json({ message: 'The post could not be found' });
        }
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error removing the post',
        });
      }
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