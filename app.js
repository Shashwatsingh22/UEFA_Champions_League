const express = require('express')

//Database COnfig
const sequelize = require('./database/config')

//Models
const Players = require('./models/users');
const Attacking = require('./models/attacking');
const Attempts = require('./models/attempts');
const Defending = require('./models/defending');
const Disciplinary = require('./models/disciplinary');
const Distribution = require('./models/distribution');
const Goalkeeping = require('./models/goalkeeping');
const Goals = require('./models/goals');
const KeyStats = require('./models/key_stats');

//For Parssing the body
const bodyParser = require('body-parser');

//for log management we need this lib
const morgan=require('morgan');
const port = process.env.PORT || 4000;

//Routes
const main = require('./routes/main')

//Init App
const app = express()

//Log Type
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Resolving Cors Error 
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
   res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
})


app.use('/',main);    

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// sequelize.sync({force:true}) --> then it will redefine or recreate the table either
// it is exist or not

// force:true --> then it will work as default which means if table exits then not create

//Associations
//Players --> Attacking
Players.hasOne(Attacking,{foreignKey : 'playerId'})
Attacking.belongsTo(Players,{foreignKey : 'playerId'})

//Players --> Goals
Players.hasOne(Goals,{foreignKey : 'playerId',as : 'Goals'})
Goals.belongsTo(Players,{foreignKey : 'playerId', as : 'GoalsPlayers'})

//Players --> Discplinary
Players.hasOne(Disciplinary,{foreignKey : 'playerId'})
Disciplinary.belongsTo(Players,{foreignKey : 'playerId'})

//Players --> Attempts
Players.hasOne(Attempts,{foreignKey : 'playerId'})
Attempts.belongsTo(Players,{foreignKey : 'playerId'})

//Players --> Defending
Players.hasOne(Defending,{foreignKey : 'playerId'})
Defending.belongsTo(Players,{foreignKey : 'playerId'})

//Players --> Distribution
Players.hasOne(Distribution,{foreignKey : 'playerId'})
Distribution.belongsTo(Players,{foreignKey : 'playerId'})

//Players --> Goalkeeping
Players.hasOne(Goalkeeping,{foreignKey : 'playerId', as : 'GoalKeeping'})
Goalkeeping.belongsTo(Players,{foreignKey : 'playerId', as : 'GoalKeepingPlayers' })

//Players --> KeysStats
Players.hasOne(KeyStats,{foreignKey : 'playerId', as : 'KeyStats'})
KeyStats.belongsTo(Players,{foreignKey : 'playerId', as : 'KeyStatsPlayers'})

sequelize.sync().then(
    result => {        
    app.listen(port,()=>{
        console.log("Server Started 👂 At "+port);
    })
        console.log(result);
    }
).catch(err=>{
    console.log(err);
})  