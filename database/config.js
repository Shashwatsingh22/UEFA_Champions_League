const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'uefa_champions_league',
    'root',
    '',
    {
     dialect: "mysql",
     host : "localhost",
     //logging : false, //=> the logs which are showing like the sql queries which it is runnong and genrating logs
     // we can clase it by this way
     dialectModule: require('mysql2'),
     pool : {max:5,min:0,idle:10000} //How many Connection ? Max -5 Min -0 TransferFromOneConntoAnother_Time- 10000 milisecond
});

sequelize.authenticate().then(
    ()=>{
        console.log("Connected With DataBase")
    }
).catch(err => {
    console.log("Not Able to Connect with DB =>",err)
})

module.exports = sequelize;