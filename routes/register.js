const express = require('express');
const db = require('../db/register.db');
const Joi = require('joi');
const string = require('joi/lib/types/string');

const router = express.Router();

// post - register
router.post('/', async(req, res) => {

    const schema = {
        username: Joi.string().min(45).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string(),
        role: Joi.string()
    }
    const resultUsername = Joi.validate(req.body.username, schema);
    const resultEmail = Joi.validate(req.body.email, schema);
    const resultPassword = Joi.validate(req.body.password, schema);
    const resultRole = Joi.validate(req.body.role, schema);

    // check for empty value
    if (resultUsername.value == undefined || resultEmail.value == undefined || resultPassword.value == undefined || resultRole.value == undefined) {
        return res.sendStatus(500).send("Input must be given");
    }


    try {
        let result = await db.insertOne(resultUsername.value, resultEmail.value, resultPassword.value, resultRole.value);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});
module.exports = router;