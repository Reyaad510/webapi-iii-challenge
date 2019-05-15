const express = require('express');

const Users = require('./userDb');
const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  try {
      const user = await Users.insert(req.body);
      res.status(201).json(user)
  } catch(err) {
      res.status(500).json({ message: 'Error adding post' })
  }

});

router.post('/:id/posts', validateUserId, (req, res) => {

});

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

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {

});

router.delete('/:id', validateUserId, (req, res) => {

});

router.put('/:id', validateUserId, (req, res) => {

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

};

module.exports = router;
