require('dotenv').config();

const express = require('express');
const db = require('../db/login.db');
const Joi = require('joi');
const string = require('joi/lib/types/string');
const jwt = require('jsonwebtoken');

const router = express.Router();

// post - login
router.post('/', async(req, res) => {
    const schema = {
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
    }
    const resultEmail = Joi.validate(req.body.email, schema);
    const resultPassword = Joi.validate(req.body.password, schema);

    // check for empty value
    if (resultEmail.value == undefined || resultPassword.value == undefined) {
        return res.send("[email and password] must be given");
    }
    try {
        let result = await db.checkLogin(resultEmail.value, resultPassword.value);
        const user = { email: result[0]["email"] };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken });
        // res.send(result);
    } catch (e) {
        return res.send("Invalid Mail or Password");
    }

});




module.exports = router;