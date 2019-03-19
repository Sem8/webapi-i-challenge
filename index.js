// implement your API here

const express = require('express');
const db = require('./data/db.js');

const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

server.get('/api/users', (req, res) => {
    // console.log(req.body);
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

// server.post('/api/users', (req, res) => {
//     const userInfo = req.body
//     console.log('user information', req.body);
//     db.insert(userInfo)
//     .then(users => {
//         if (users.name || users.bio) {
//             res.status(201).json(users);
//         } else {
//             res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
//         }        
//     })
//     .catch(error => {
//         res.status(500).json({message: "There was an error while saving the user to the database"})
//     });
// });

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    console.log('user information', req.body);
    if (userInfo.name && userInfo.bio) {
        db.insert(userInfo)
        .then(users => {           
                res.status(201).json(users);            
        })
        .catch(error => {
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id).then(deleted => {
        if (deleted) {
            res.status(204).end();            
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }        
    })
    .catch(error => {
        res.status(500).json({error: "The user could not be removed"});
    });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const userInfoChange = req.body;
    if (userInfoChange.name || userInfoChange.bio) {
        db.update(id, userInfoChange)
        .then(updated => {
            if(updated) {
                res.status(200).json(updated);
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The user information could not be modified."})
        })

    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })

    }   
});


server.listen(4000, () => {
    console.log('\n** API up and running on port 4000')
});


