//Models Import
const Players = require('../models/users');
const Attacking = require('../models/attacking');
const Attempts = require('../models/attempts');
const Defending = require('../models/defending');
const Disciplinary = require('../models/disciplinary');
const Distribution = require('../models/distribution');
const Goalkeeping = require('../models/goalkeeping');
const Goals = require('../models/goals');
const KeyStats = require('../models/key_stats');

//Modules
const {Sequelize,Op, QueryTypes} = require('sequelize')

//db config
const sequelize = require('../database/config')


exports.nil = async(req,res,next)=>{
   
    // const clubs = await Players.findAll({
    //     attributes: ['clubName']
    //   });

    // let clubNames = new Set();

    //Collecting the clubs
    // for(let i=0;i<clubs.length;i++)  clubNames.add(clubs[i].clubName);

    // let goalsByClubs = new Object();
    
    // for(let clubName of clubNames.values()){
        
    //     goalsByClubs[clubName] = 0;
    //     try{
    //         const playerData=await Players.findAll(
    //             {
    //             where: { clubName: clubName  }
    //             });


    //         for(let player of playerData){
    //             try{
    //                 const goalsData=await Goals.findOne({
    //                     where:{
    //                                 playerId: player.id
    //                             }
    //                    });
    //                 if(goalsData){
    //                     goalsByClubs[clubName]+= goalsData.goals;
    //                 }
    //             }
    //             catch(error){
    //                 console.log("ERROR,Inside Player Data",error)
    //             }
    //         }
    //     }
    //     catch(error){
    //         console.log("Error")
    //     }
    // }
    // console.log(goalsByClubs);
    // goalsByClubs=functions.sortObjectEntries(goalsByClubs);
    // res.status(200).json({
    //         status : true,
    //         message : "Fetched Data",
    //         Club_with_highest_goals : goalsByClubs[0],
    //         club_with_second_highest_goals : goalsByClubs[1],
    //         club_with_lowest_goals : goalsByClubs[goalsByClubs.length-1] 
    //     }) 
    

    
    try{
    const goalsByClubs = await sequelize.query(
        "SELECT players.clubName,sum(goals.goals) AS totalGoals FROM players INNER JOIN  goals on (players.id = goals.playerId) GROUP BY players.clubName ORDER BY (totalGoals) DESC;",
         {
            type : QueryTypes.SELECT
         }
    );

      res.status(200).json({
            status : true,
            message : "Fetched Data",
            Club_with_highest_goals : goalsByClubs[0],
            club_with_second_highest_goals : goalsByClubs[1],
            club_with_lowest_goals : goalsByClubs[goalsByClubs.length-1] 
        }) 
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json(err);
    }
}

exports.serachByPlayerProfile = async(req,res,next) => {
    
    //First Searching the User Basic Details
    // const playerData = await Players.findOne({ where: { 
    //     firstName: firstName,
    //     lastName : lastName
    // } });
     
    // if (playerData === null) {
        
    //     res.status(404).json({
    //         status : false,
    //         message : "Data Not Found"
    //     }) 

    //    } 
    //    else {
    //     playerCompleteData.clubName=playerData.clubName;
    //     playerCompleteData.id = playerData.id;        
    // }

    // //For Goals
    // const playerGoals = await Goals.findOne({
    //     where:{
    //         playerId: playerCompleteData.id
    //     }
    // })
    
    // if(playerGoals==null) console.log("Not Found the User Goals Data");
    // else
    // {
    //     playerCompleteData.goals = playerGoals.goals;
    // }

    // //For Disciplinary
    // const playerDisciplinary = await Disciplinary.findOne({
    //     playerId : playerCompleteData.id
    // })
    // if(playerGoals==null) console.log("Not Found the User Goals Data");
    // else
    // {
    //     playerCompleteData.minutes_played = playerDisciplinary.minutes_played;
    //     playerCompleteData.fouls_committed = playerDisciplinary.fouls_committed;
    //     playerCompleteData.fouls_suffered = playerDisciplinary.fouls_suffered;
    //     playerCompleteData.red = playerDisciplinary.red;
    //     playerCompleteData.yellow = playerDisciplinary.yellow
    // }

    let playerName = req.body.playerName;
    
    playerName=playerName.split(' ');
    let firstName = playerName[0];
    let lastName = playerName[1];
    
    if(lastName === undefined) lastName="";
    
    let playerCompleteData = new Object();
    
    //This can be Solved By the One Hit to the Database (With One Querry) By Association (Joins)
    
    // Player Name --> firsName and lastName (Where) --> joins --> includes 
    // includes -->  Goals --> number of goals (goals)
    // Discilinay --> minutes_played , fouls_committed, fouls_suffered, red , yellow
    try{
       let data =  await Players.findOne({
        attributes : ['firstName','lastName','clubName'],
        include : [
            {
             model : Goals,
             as : 'Goals',
             attributes : ['goals']
            },
            {
                model : Disciplinary,
                attributes : ['minutes_played' , 'fouls_committed' , 'fouls_suffered', 'red' , 'yellow']
            }],
            where: {
                [Op.and]: [
                      { firstName: firstName},
                      { lastName: lastName }
                    ]
                // firstName: firstName,
                // lastName : lastName
        }
       })
       
       if(data===null) res.status(400).send("Not Able to Find the Data");

       else{
       playerCompleteData.Name = data.firstName+" "+data.lastName;
       playerCompleteData.clubName=data.clubName;
       playerCompleteData.goals = data.Goals.goals;
       playerCompleteData.minutes_played = data.Disciplinary.minutes_played;
       playerCompleteData.fouls_committed = data.Disciplinary.fouls_committed;
       playerCompleteData.fouls_suffered = data.Disciplinary.fouls_suffered;
       playerCompleteData.red = data.Disciplinary.red;
       playerCompleteData.yellow = data.Disciplinary.yellow

       res.status(200).json({
        status : true,
        message : "Fetched the Player Data",
        data : playerCompleteData,
    }) 
}
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({
            status : false,
            message : "Some Error Caused",
            err : err
        }) 
    }
}

exports.serachByClubName = async(req,res,next) =>{
    
    // let clubName = req.body.clubName;
    // let result = new Object();

    // let lastScorePlayer = ''; 
    // let lastScore = -1; 
    

    // try{
    //     const playerData=await Players.findAll(
    //         {
    //         where: { clubName: clubName  }
    //         });

    //     result.totalGoals = 0;
    //     result.totalGoalsSaved = 0;
    //     result.totalGoalsConceded = 0;
    //     result.totalMatchPlayed = 0;
    //     result.totalAssists=0;

    //     for(let player of playerData){
    //         try{
    //             const keyStats=await KeyStats.findOne({
    //                 where:{
    //                             playerId: player.id
    //                         }
    //                });
    //             if(keyStats){
    //                 result.totalGoals +=keyStats.goals;
    //                 result.totalMatchPlayed += keyStats.match_played;
    //                 result.totalAssists += keyStats.assists;
    //                 if(lastScore<keyStats.goals)
    //                 {
    //                     lastScorePlayer= player.firstName+' '+player.lastName,
    //                     lastScore = keyStats.goals
    //                 }
                    
    //             }
    //         }
    //         catch(error){
    //             console.log("ERROR,Inside Player Data",error)
    //         }

    //         // from Goal Keeping Table
    //         try{
    //             const goalkeeping=await Goalkeeping.findOne({
    //                 where:{
    //                             playerId: player.id
    //                         }
    //                });
    //             if(goalkeeping){
    //                 result.totalGoalsConceded +=goalkeeping.conceded;
    //                 result.totalGoalsSaved += goalkeeping.saved;
    //             }
    //         }
    //         catch(error){
    //             console.log("ERROR,Inside Player Data",error)
    //         }
    //     }
    // }
    // catch(error){
    //     console.log("Error")
    // }
    
    // result.topScorer = { playerName : lastScorePlayer, totalGoals : lastScore };
    
    let clubName = req.body.clubName;
    //KeyStats --> goals,match_played,assists ✅
    //GoalKeeping --> conceded,saved ✅

    //Goals --> Top Scorred Player Name ❗
    
    try{
    const data = await Players.findAll({
        attributes :{
            include : [
                [
                    Players.sequelize.literal(`(SELECT players.firstName , players.lastName, max(goals.goals) from players INNER JOIN goals on (players.id = goals.playerId) WHERE players.clubName='${clubName}'`
                      ),
                      'topPlayer'
                    ],
                    
            ]
        },
        include : [
            {
                model : Goalkeeping,
                attributes : [
                    [Sequelize.fn('sum', Sequelize.col('conceded')), 'totalConceded'],
                    [Sequelize.fn('sum', Sequelize.col('saved')), 'totalSaved'],
                ],
                subQuery: true,
                as : 'GoalKeeping'
                
            },
            {
                model : KeyStats,
                attributes : [
                    [Sequelize.fn('sum', Sequelize.col('KeyStats.goals')), 'totalGoals'],
                    [Sequelize.fn('sum', Sequelize.col('KeyStats.match_played')), 'totalMatchPlayed'],
                    //Here, ambigous problem occure becoz this col match played present in both the table
                    // i.e. KeyStats as well as Goalkeepings --> 
                     //So try to Do alias first then TableName.colName in side the Seq.col
                    [Sequelize.fn('sum', Sequelize.col('assists')), 'totalAssists'],
                ],
                subQuery: true,
                as : 'KeyStats'
            },
             
                
                   //[Sequelize.fn('max', Sequelize.col('Goals.goals')), 'maxGoals']
                
            
        ],
        
        where : { clubName : clubName },
        distinct : true
    })
    res.status(200).json({
        status : true,
        message : "Fetched Data",
        data : data
    }) 
}
catch(err)
{
    console.log(err);
}

    
 
}

exports.clubNamesAndPos = async(req,res,next) => {

    // let clubNames = req.body.clubNames;
    // let position = req.body.position;
    // //---------------------------------------------------------------------------------//
    // let goalsByClubsAtGivenPos = new Object();
    
    // for(let clubName of clubNames.values()){
        
    //     goalsByClubsAtGivenPos[clubName] = 0;

    //     try{
    //         const playerData=await Players.findAll(
    //             {
    //             where: { clubName: clubName  }
    //             });


    //         for(let player of playerData){
    //             try{
    //                 const goalsData=await Goals.findOne({
    //                     where:{
    //                                 playerId: player.id,
    //                                 position : position
    //                             }
    //                    });
    //                 if(goalsData){
    //                     goalsByClubsAtGivenPos[clubName]+= goalsData.goals;
    //                 }
    //             }
    //             catch(error){
    //                 console.log("ERROR,Inside Player Data",error)
    //             }
    //         }
    //     }
    //     catch(error){
    //         console.log("Error")
    //     }
    // }

    let clubNames = req.body.clubNames;
    let position = req.body.position;
    
    try{
        const data = await sequelize.query(`SELECT players.clubName , sum(goals.goals) as 'totalGoals' from players JOIN goals on (players.id = goals.playerId) WHERE goals.position = (:position)  AND players.clubName in (:clubNames) GROUP BY clubName`,{
            type : QueryTypes.SELECT,
            replacements : {
                clubNames: clubNames,
                position : position
            }

        })
    
        res.status(200).json({
            status : true,
            message : "Fetched Data",
            data : data
        }) 
    }
    catch(err)
    {
        console.log(err)
    }
   
}

exports.heatMap = async(req,res,next) => {
    // let clubName = req.body.clubName;
    // let option = req.body.option;

    // let result = new Object();
    
    // switch (option) {
    //     case "attack":
          
    //         try{
    //             const playerData=await Players.findAll(
    //                 {
    //                 where: { clubName: clubName  }
    //                 });
        
    //             for(let player of playerData){
    //                 let playerName = player.firstName+' '+player.lastName;
                    
    //                 try{
    //                     const goalsData = await Goals.findOne({
    //                         where:{
    //                                     playerId: player.id
    //                                 }
    //                        });
    //                     if(goalsData){
    //                         result[playerName] = [];
    //                         result[playerName].push({ goals : goalsData.goals});
    //                     }
    //                 }
    //                 catch(error){
    //                     console.log("ERROR,Inside Player Data",error)
    //                 }
        
    //                 // from Attacking Table
    //                 try{
    //                     const attackingData = await Attacking.findOne({
    //                         where:{
    //                                     playerId: player.id
    //                                 }
    //                        });
    //                     if(attackingData){
    //                         result[playerName].push({ assists : attackingData.assists});
    //                         result[playerName].push({ corner_taken : attackingData.corner_taken});
    //                         result[playerName].push({ dribbles : attackingData.dribbles});
    //                         result[playerName].push({ offsides : attackingData.offsides});
    //                     }
                        
    //                 }
    //                 catch(error){
    //                     console.log("ERROR,Inside Player Data",error)
    //                 }
    //             }
    //         }
    //         catch(error){
    //             console.log("Error")
    //         }
          
    //         break;
        
    //     case "defence":
    //         try{
    //             const playerData=await Players.findAll(
    //                 {
    //                 where: { clubName: clubName  }
    //                 });
        
    //             for(let player of playerData){
    //                 let playerName = player.firstName+' '+player.lastName;
                    
                    
    //                 try{
    //                     const goalsData = await Goals.findOne({
    //                         where:{
    //                                     playerId: player.id
    //                                 }
    //                        });
    //                     if(goalsData){
    //                         result[playerName] = [];
    //                         result[playerName].push({ goals : goalsData.goals});
    //                     }
    //                 }
    //                 catch(error){
    //                     console.log("ERROR,Inside Player Data",error)
    //                 }
        
    //                 // from Attacking Table
    //                 try{
    //                     const defendingData = await Defending.findOne({
    //                         where:{
    //                                     playerId: player.id
    //                                 }
    //                        });
    //                     if(defendingData){
    //                         result[playerName].push({ tackles_won : defendingData.t_won});
    //                         result[playerName].push({ tackles_lost : defendingData.t_lost});
    //                         result[playerName].push({ clearance_attempted : defendingData.clearance_attempted});
    //                         result[playerName].push({ balls_recoverd : defendingData.balls_recoverd});
    //                     }
                        
    //                 }
    //                 catch(error){
    //                     console.log("ERROR,Inside Player Data",error)
    //                 }
    //                 console.log(result);
    //             }
    //         }
    //         catch(error){
    //             console.log("Error")
    //         }
          
    //         break;
        
    //     case "goalkeeper":
    //         try{
    //             const playerData=await Players.findAll(
    //                 {
    //                 where: { clubName: clubName  }
    //                 });
        
    //             for(let player of playerData){
    //                 let playerName = player.firstName+' '+player.lastName;
                    
    //                 // from Attacking Table
    //                 try{
    //                     const goalkeepingData = await Goalkeeping.findOne({
    //                         where:{
    //                                     playerId: player.id
    //                                 }
    //                        });
    //                     if(goalkeepingData){
    //                         result[playerName] = [];
    //                         // saved,conceded,cleansheets,punches_made
    //                         result[playerName].push({ saved : goalkeepingData.saved});
    //                         result[playerName].push({  conceded : goalkeepingData.conceded});
    //                         result[playerName].push({ cleansheets : goalkeepingData.cleansheets});
    //                         result[playerName].push({ punches_made : goalkeepingData.punches_made});
    //                     }
                        
    //                 }
    //                 catch(error){
    //                     console.log("ERROR,Inside Player Data",error)
    //                 }
    //             }
    //         }
    //         catch(error){
    //             console.log("Error")
    //         }
          
    //         break;
  
    //     default:
    //       break;
    //   }
    
    let clubName = req.body.clubName;
    let option = req.body.option;
  
    // if Option === 'attack'
    // KeyStats --> Number of Goals
    //Attacking --> assists, corner_taken, dribbles, offsides

    //if option === 'defence'
    // KeyStats --> No. of Goals
    // Defending --> tackles_won, tackles_lost,clearance_attempted,balls_recoverd

    // if option === 'goalKeeper'
    //Goalkeeping --> saved, conceded , cleanSheets, punched_made

    try{
        let data = new Object;
        switch (option) {
            case 'attack':
                try{
                data = await Players.findAll({
                    attributes : ['firstName','lastName'],
                    
                    include : [
                        {
                            model : KeyStats,
                            as  : 'KeyStats',
                            attributes : ['goals']
                        },
                        {
                            model : Attacking,
                            attributes : ['assists','corner_taken','dribbles','offsides']
                        }
                    ],

                    where : {
                        clubName : clubName,
                    }
                })
            }
            catch(err)
            {
                console.log(err);
            }
                break;
            case 'defence':
                try{
                data = await Players.findAll({
                    attributes : ['firstName','lastName'],
                    include : [
                        {
                            model : KeyStats,
                            as  : 'KeyStats',
                            attributes : ['goals']
                        },
                        {
                            model : Defending,
                            attributes : ['t_won','t_lost','clearance_attempted','balls_recoverd']
                        }
                    ],
                    where : {
                        clubName : clubName
                    }
                })
                }
                catch(err)
                {
                    console.log(err);
                }
                break;
            case 'goalKeeper':
                try{
                    data = await Players.findAll({
                        attributes : ['firstName','lastName'],
                        include : [
                            {
                                model : Goalkeeping,
                                as  : 'GoalKeeping',
                                attributes : ['saved','conceded','cleanSheets','punches_made']
                            }]
                        })
                }   
                catch(err)
                {
                    console.log(err);
                }
                break; 
            default:
                break;
        }
        res.status(200).json({
            status : true,
            message : "Fetched Data",
            clubName : clubName,
            type : option,
            result : data
        }) 
    }
    catch(err)
    {
        console.log(err)
    }

      
}