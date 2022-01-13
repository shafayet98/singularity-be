const express = require('express');
const db = require('../db/user.db');


const router = express.Router();


// get all
router.get('/', async(req, res) => {
    try {
        let result = await db.getAll();
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// get one
router.get('/:id', async(req, res) => {
    try {
        let result = await db.getOne(req.params.id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// post
router.post('/', async(req, res) => {
    try {
        let result = await db.insertOne(req.body.username, req.body.email, req.body.password, req.body.role);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


// update 
router.put('/:id', async(req, res) => {
    try {
        let result = await db.updateOne(req.params.id, req.body.username, req.body.role);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// delete
router.delete('/:id', async(req, res) => {
    try {
        let result = await db.deleteOne(req.params.id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// delete all
router.delete('/', async(req, res) => {
    try {
        let result = await db.deleteAll();
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;