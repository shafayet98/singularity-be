const express = require('express');
const db = require('../db/genre.db');


const router = express.Router();


// get all
router.get('/', async(req, res) => {
    try {
        let result = await db.getAll();
        let customMsg = {
            "developers Note": req.body
        };
        if (Object.keys(req.body).length === 0) {
            // Do something
            console.log("HERE");
            res.json(result);
        } else {
            result.push(customMsg);
            res.json(result);
        }



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
        let result = await db.insertOne(req.body.genrename);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


// update
router.put('/:id', async(req, res) => {
    try {
        let result = await db.updateOne(req.params.id, req.body.genrename);
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