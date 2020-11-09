const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const expressHBS = require("express-handlebars");
const ifEquality = require("./views/helpers/ifEquality");
const Joi = require("joi");
const signupData = require("./database/model/signupData");
const {
    genderCount,
    professionCount
} = require("./database/query/sharedFunction");
const experienceCount = require("./database/query/experience");


const app = express()

const hbs = expressHBS.create({
    extName: '.hbs',
    layoutsDir: path.join(__dirname, './views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        ifEquality
    }
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set("views", path.join(__dirname, './views'));

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

const getUserData = async (contactNo) => {
    const result = await signupData.findAll({where: { contactNo }});
    return JSON.parse(JSON.stringify(result));
}

app.use("/images", express.static(path.join(__dirname, "./images")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.status(200).render('home.hbs', {
        layout: 'navigation.hbs',
        title: 'Home'
    });
});

app.get('/signup', (request, response) => {
    response.status(200).render('signup.hbs', {
        layout: 'navigation.hbs',
        title: 'Sign Up',
        action: '/signup',
        method: 'POST'
    });
});

app.get('/charts', async(request, response) => {
    var { label: label1, count: count1} = await genderCount();
    var { label, count } = await professionCount();
    console.log(label, count);
    const experience = await experienceCount();
    response.status(200).render("chart.hbs", {
        layout: "navigation.hbs",
        title: "Charts",
        label1: label1,
        data1: count1,
        label2: label,
        data2: count,
        data3: experience
    });
});

app.post('/signup', async (request, response) => {
    const result = schema.validate(request.body);
    if(result.error){
        response.status(200).send({
            message: 'Data entered is invalid'
        });
    } else {
        const exists = await getUserData(request.body.contactNo);
        if(exists.length > 0){
            response.status(401).send({
                message: "Contact Number already exists"
            });
            return;
        }
        try {
            const result = await signupData.create(request.body);
            response.status(200).send({
                message: 'Sign-Up successful'
            });
        } catch(e) {
            response.status(200).send({
                message: "Data entered is Invalid"
            });
        }
    }
})



app.get('*', (request, response) => {
    response.redirect('/')
});

app.listen(8080, () => {
    console.log("Server is running!")
})