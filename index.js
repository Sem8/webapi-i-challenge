// implement your API here

const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
    db.find().then(users => {
        res.status(200).json(users);
    }).catch(error => {
        res.status(500).json({ message: 'The users information could not be retrieved.'})
    })
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id).then(users => {
        if(users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({message: 'The user with the specified ID does not exist.'});
        }
    })
    .catch(error => {
        res.status(500).json({ message: "The user information could not be retrieved."})
    })

})

server.post('/api/users', (req, res) => {
    const userInfo = req.body
    console.log('user information', req.body);
    db.add(userInfo)
    .then(users => {
        res.status(201).json(users);
    })
})


server.listen(4000, () => {
    console.log('\n** API up and running on port 4000')
});


