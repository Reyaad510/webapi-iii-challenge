const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb');
const router = express.Router();


// Create - Create new users

router.post('/', validateUser, async (req, res) => {
  try {
      const user = await Users.insert(req.body);
      res.status(201).json(user)
  } catch(err) {
      res.status(500).json({ message: 'Error adding post' })
  }

});

// Create - Create new post for specific user

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  const postsInfo = { ...req.body, user_id: req.params.id };

  try {
    const post = await Posts.insert(postsInfo);
    res.status(210).json(post);
  } catch(error) {
      res.status(500).json({ message: 'Error getting the posts for the hub'});
  }

});


// Read - Obtain lists of users
router.get('/', async (req, res) => {
    
    try {
        const users = await Users.get();
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json({
            message: "Error retrieving users"
        })
    }

});


// Read - Obtain info of specific user
router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
});


// Read - Obtain specific user posts
router.get('/:id/posts', validateUserId, async (req, res) => {
    try {
        const posts = await Users.getUserPosts(req.params.id);
        res.status(200).json(posts)
    } catch(err) {
        res.status(500).json({ message: "Error getting posts from hub" })
    }
});

router.delete('/:id', validateUserId, async (req, res) => {
    try {
        const count = await Users.remove(req.params.id);
        if(count > 0) {
            res.status(200).json({ message: 'The user has been deleted' })
        } else {
            res.status(404).json({ message: 'The user could not be found' })
        } 
    } catch(err) {
        res.status(500).json({ message: "Error removing user" })
    }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
    try {
        const user = await Users.update(req.params.id, req.body);
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'The user could not be found' })
        }
    } catch(err) {
        res.status(500).json({ message: 'Error updating the hub' })
    }
});

//custom middleware

async function validateUserId(req, res, next) {
try {
    const { id } = req.params;
    const user = await Users.getById(id);

    if(user) {
        req.user = user;
        next();
    } else {
        res.status(400).json({ message: "Invalid user id" })

    }
} catch(err) {
    res.status(500).json({ message: 'Failed to process request' })
}
};

function validateUser(req, res, next) {
 if(req.body && Object.keys(req.body).length) {
     next();
 } else if(!req.body) {
     res.status(400).json({ message: "Missing user data" })
 } else if(!req.body.name){
     res.status(400).json({ message: "Missing required name field" })
 }
};

function validatePost(req, res, next) {
    if(req.body && Object.keys(req.body).length) {
        next();
    } else if(!req.body) {
        res.status(400).json({ message: "Missing user data" })
    } else if(!req.body.name){
        res.status(400).json({ message: "Missing required text field" })
    }
};

module.exports = router;
