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

//Functions Importing
const functions = require('../functions/main')



exports.nil = async(req,res,next)=>{
   
    const clubs = await Players.findAll({
        attributes: ['clubName']
      });
    let clubNames = new Set();
    //Collecting the clubs
    for(let i=0;i<clubs.length;i++)  clubNames.add(clubs[i].clubName);

    //---------------------------------------------------------------------------------//
    let goalsByClubs = new Object();
    
    for(let clubName of clubNames.values()){
        
        goalsByClubs[clubName] = 0;
        try{
            const playerData=await Players.findAll(
                {
                where: { clubName: clubName  }
                });


            for(let player of playerData){
                try{
                    const goalsData=await Goals.findOne({
                        where:{
                                    playerId: player.id
                                }
                       });
                    if(goalsData){
                        goalsByClubs[clubName]+= goalsData.goals;
                    }
                }
                catch(error){
                    console.log("ERROR,Inside Player Data",error)
                }
            }
        }
        catch(error){
            console.log("Error")
        }
    }
   
    goalsByClubs=functions.sortObjectEntries(goalsByClubs);
    res.status(200).json({
            status : true,
            message : "Fetched the Player Data",
            Club_with_highest_goals : goalsByClubs[0],
            club_with_second_highest_goals : goalsByClubs[1],
            club_with_lowest_goals : goalsByClubs[goalsByClubs.length-1] 
        }) 
    
}

exports.serachByPlayerProfile = async(req,res,next) => {
    let playerName = req.body.playerName;
    
    playerName=playerName.split(' ');
    let firstName = playerName[0];
    let lastName = playerName[1];
    
    let playerCompleteData = new Object();
    
    //First Searching the User Basic Details
    const playerData = await Players.findOne({ where: { 
        firstName: firstName,
        lastName : lastName
    } });
     
    if (playerData === null) {
        
        res.status(404).json({
            status : false,
            message : "Data Not Found"
        }) 

       } 
       else {
        playerCompleteData.clubName=playerData.clubName;
        playerCompleteData.id = playerData.id;        
    }

    //For Goals
    const playerGoals = await Goals.findOne({
        where:{
            playerId: playerCompleteData.id
        }
    })
    
    if(playerGoals==null) console.log("Not Found the User Goals Data");
    else
    {
        playerCompleteData.goals = playerGoals.goals;
    }

    //For Disciplinary
    const playerDisciplinary = await Disciplinary.findOne({
        playerId : playerCompleteData.id
    })
    if(playerGoals==null) console.log("Not Found the User Goals Data");
    else
    {
        playerCompleteData.minutes_played = playerDisciplinary.minutes_played;
        playerCompleteData.fouls_committed = playerDisciplinary.fouls_committed;
        playerCompleteData.fouls_suffered = playerDisciplinary.fouls_suffered;
        playerCompleteData.red = playerDisciplinary.red;
        playerCompleteData.yellow = playerDisciplinary.yellow
    }
    
        
            res.status(200).json({
                status : true,
                message : "Fetched the Player Data",
                data : playerCompleteData,
            }) 
}

exports.serachByClubName = async(req,res,next) =>{
    
    let clubName = req.body.clubName;

    try{
        const playerData=await Players.findAll(
            {
            where: { clubName: clubName  }
            });


        for(let player of playerData){
            try{
                const goalsData=await Goals.findOne({
                    where:{
                                playerId: player.id
                            }
                   });
                if(goalsData){
                    goalsByClubs[clubName]+= goalsData.goals;
                }
            }
            catch(error){
                console.log("ERROR,Inside Player Data",error)
            }
        }
    }
    catch(error){
        console.log("Error")
    }
}