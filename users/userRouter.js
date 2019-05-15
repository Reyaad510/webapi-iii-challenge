const express = require('express');

const Users = require('./userDb');
const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

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

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

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

};

function validatePost(req, res, next) {

};

module.exports = router;
