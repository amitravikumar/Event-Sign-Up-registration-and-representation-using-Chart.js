const userDb = require('../model/signupData');
const Sequelize = require('sequelize');

const charData = (arr,data) => {
    const label = [];
    const count = [];
    const keyCheck = data === 'gen' ? "gender" : "profession";
    arr.forEach((element) => {
        label.push(element[keyCheck]);
        count.push(element["count"])
    });
    return { label, count};
};

const genderCount = async() => {
    const result = await userDb.findAll({
        group: ['gender'],
        attributes: ['gender', [Sequelize.fn("COUNT", "contactNo"), "count"]]
    });

    const parseData = JSON.parse(JSON.stringify(result));

    const {label, count } = await charData(parseData, "gen");
    return{ label, count}
};

const professionCount = async() => {
    const result = await userDb.findAll({
        group: ['profession'],
        attributes: ['profession', [Sequelize.fn("COUNT", "contactNo"), "count"]]
    });

    const parseData = JSON.parse(JSON.stringify(result));

    const { label, count} = await charData(parseData, 'prof');
    return { label, count};
}

module.exports = { genderCount, professionCount };