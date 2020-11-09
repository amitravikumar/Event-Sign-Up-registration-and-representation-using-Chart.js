const { Op } = require('sequelize');
const userDb = require('../model/signupData');
const Sequelize = require('sequelize');

const experienceCount = async() => {
    const lessThanTwo = await userDb.findAll({
        where: {
            experience: {
                [Op.lt]: 2
            }
        },
        attributes : [[Sequelize.fn("COUNT", "contactNo"), "count"]]
    });

    const twoToSix = await userDb.findAll({
        where: {
            experience: {
                [Op.lt]: [2,6]
            }
        },
        attributes : [[Sequelize.fn("COUNT", "contactNo"), "count"]]
    });

    const greaterThanSix = await userDb.findAll({
        where: {
            experience: {
                [Op.gt] : 6
            }
        },
        attributes : [[Sequelize.fn("COUNT", "contactNo"), "count"]]
    });

    const first = JSON.parse(JSON.stringify(lessThanTwo));
    const second = JSON.parse(JSON.stringify(twoToSix));
    const third = JSON.parse(JSON.stringify(greaterThanSix));

    const expData = [first[0].count, second[0].count, third[0].count];
    return expData;
};

module.exports = experienceCount;