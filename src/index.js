const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressHBS = require("express-handlebars");
const Joi = require('Joi');
const ifEquality = require("./views/helpers/ifEquality");

const app = express()

const hbs = expressHBS.create({
    extName: '.hbs',
    layoutsDir: path.join(__dirname, './views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        ifEquality
    }
});

//Object Validation
const prof = ['IT', 'Management', 'Student', 'Content-writer'];
const gen = ['Male', 'Female'];

const schema = Joi.object().keys({
    firstName: Joi.string()
        .regex(/^[A-Za-z]*$/)
        .required(),
    lastName: Joi.string()
        .regex(/^[A-Za-z]*$/)
        .required(),
    contactNo: Joi.string()
        .regex(/^\d{10}$/)
        .required(),
    city: Joi.string()
        .regex(/^[A-Za-z]*$/)
        .required(),
    address: Joi.string().required(),
    profession: Joi.string()
        .valid(...prof)
        .required(),
    gender: Joi.string()
        .valid(...gen)
        .required(),
    experience: Joi.number().min(0).max(40).required()
});
