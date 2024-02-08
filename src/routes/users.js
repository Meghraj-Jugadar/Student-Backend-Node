const express = require('express');
const bcrypt = require('bcrypt');
const userRepo = require('../repos/user-repo');

const router = express.Router();

const saltRounds = 10;

router.get('/users', async (req, res) => {
    const users = await userRepo.find();
    console.log(users)
    res.send(users);
});

router.get('/users/:email', async (req, res) => {
    const { email } = req.params;
    const users = await userRepo.findByEmail(email);
    if(users){
        res.send(users);
    }else{
        res.sendStatus(404);
    }
});

router.post('/users', async (req, res) => {
    const { name, number, email, psw } = req.body;
    const bcryptPsw = psw;
    const hashPass = await bcrypt.hash(bcryptPsw, saltRounds);
    const user = await userRepo.insert(name, number, email, hashPass);
    res.send(user);
});

router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, number, email, psw } = req.body;

    const user = await userRepo.update(id, name, number, email, psw);
    if(user){
        res.send(user);
    }else{
        res.sendStatus(404);
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await userRepo.delete(id);
    if(user){
        res.send(user);
    }else{
        res.sendStatus(404);
    }
});

module.exports = router;
