const signupData = require("../model/signupData");

const data = [
    {
        firstName: "Amit",
        lastName: "Kumar",
        gender: "Male",
        profession: "Management",
        experience: 3,
        city: "Mumbai",
        address: "1/12, Some address",
        contactNo: "1234567890"
    },
    {
        firstName: "Rakesh",
        lastName: "Prakash",
        gender: "Male",
        profession: "Student",
        experience: 0,
        city: "Pune",
        address: "1/12, Some address",
        contactNo: "0123456789"
    },
    {
        firstName: "Shivam",
        lastName: "Ram",
        gender: "Female",
        profession: "IT",
        experience: 4,
        city: "Thane",
        address: "1/12, Some address",
        contactNo: "9012345678"
    },
    {
        firstName: "Debashika",
        lastName: "Singh",
        gender: "Female",
        profession: "Content-Writer",
        experience: 7,
        city: "Raigad",
        address: "1/12, Some address",
        contactNo: "8901234567"
    },
    {
        firstName: "Mani",
        lastName: "Kumar",
        gender: "Male",
        profession: "Content-Writer",
        experience: 3,
        city: "Mumbai",
        address: "1/12, Some address",
        contactNo: "7890123456"
    },
    {
        firstName: "Tarzan",
        lastName: "Singh",
        gender: "Female",
        profession: "Management",
        experience: 5,
        city: "Thane",
        address: "1/12, Some address",
        contactNo: "5678901234"
    },
    {
        firstName: "Stephen",
        lastName: "France",
        gender: "Male",
        profession: "Student",
        experience: 0,
        city: "Thane",
        address: "1/12, Some address",
        contactNo: "4567890123"
    },
    {
        firstName: "Bala",
        lastName: "Murugan",
        gender: "Male",
        profession: "IT",
        experience: 4,
        city: "Mumbai",
        address: "1/12, Some address",
        contactNo: "3456789012"
    },
    {
        firstName: "Karthi",
        lastName: "Krishnan",
        gender: "Male",
        profession: "Management",
        experience: 2,
        city: "Mumbai",
        address: "1/12, Some address",
        contactNo: "2345678901"
    },
    {
        firstName: "Vignesh",
        lastName: "Babu",
        gender: "Male",
        profession: "IT",
        experience: 3,
        city: "Mumbai",
        address: "1/12, Some address",
        contactNo: "1103456789"
    }
];

const dataSeeder = async () => {
    try{
        await signupData.sync({ force: true});
        data.forEach(async (element => {
            const result = await signupData.create(element);
            console.log(result.get());
        });
    } catch(e) {
        console.log(e);
    }
};

dataSeeder();
