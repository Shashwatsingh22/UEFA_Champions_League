const sequelize = require('./database/config');
const csvtojson = require('csvtojson');

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

//For Files
let files = ["attacking.csv","attempts.csv","defending.csv","disciplinary.csv","distributon.csv","goalkeeping.csv","goals.csv","key_stats.csv"]
  
//Associations
//Players --> Attacking
Players.hasOne(Attacking,{foreignKey : 'playerId'})
Attacking.belongsTo(Players,{foreignKey : 'playerId'})

//Players --> Goals
Players.hasOne(Goals,{foreignKey : 'playerId'})
Goals.belongsTo(Players,{foreignKey : 'playerId'})

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
Players.hasOne(Goalkeeping,{foreignKey : 'playerId'})
Goalkeeping.belongsTo(Players,{foreignKey : 'playerId'})

//Players --> KeysStats
Players.hasOne(KeyStats,{foreignKey : 'playerId'})
KeyStats.belongsTo(Players,{foreignKey : 'playerId'})



//Sync helps us to sync the model with database(Table)
sequelize.sync().then(
    result => {
        console.log(result);
    }
).catch(err=>{
    console.log(err);
})

//Searching for Players in Players Table
const findPlayer = async(firstName,lastName,club) =>{
try{
  const data = await Players.findOne({
    where: {
      firstName: firstName,
      lastName : lastName,
      clubName : club
    }
  });
  
   return data;
}  
catch(err)
{
  console.log(err)
}
}

//Creating User Table
const migrateUserData = () => {
  //console.log(files.length)
  for(let i=0;i<files.length;i++)
  {
    //console.log("archive/"+files[i])
    csvtojson().fromFile("archive/"+files[i]).then(source => {    
      for(let i=0;i<source.length;i++)
      {
        let name=source[i].player_name.split(' ');
        let club=source[i].club;
  
        if(name[1]===undefined) name[1]='';
  
        findPlayer(name[0],name[1],club).then(data => {
          if(data === null)
          {
            console.log("Not Found");
            Players.create({
              firstName:name[0],
              lastName:name[1],
              clubName:club 
            }).then(result=>{
              console.log(result);
            }).catch(err=>{
              console.log(err);
            }
            )
          }
          
          else{
            console.log("Already Have Entry")
          
          }
          
        }).catch(err=>{
            console.log(err)
        })
      }})
  }
  
};

//migrateUserData()

//For Attacking Table
const migrateAttackingPlayerData = () =>{
  csvtojson().fromFile("archive/"+files[0]).then(source => {    
    for(let i=0;i<source.length;i++)
     {
      let name=source[i].player_name.split(' ');
      let club=source[i].club;
      //position,assists,corner_taken,offsides,dribbles,match_played
      let position=source[i].position;
      let assists=source[i].assists;
      let corner_taken=source[i].corner_taken;
      let offsides=source[i].offsides;
      let dribbles=source[i].dribbles;
      let match_played=source[i].match_played;

      if(name[1]===undefined) name[1]='';

      findPlayer(name[0],name[1],club).then(data => {
        if(data === null)
        {
          //If Data is Not Avaiable then add the player then create then by 
          //the help of there id add to the attacking table
          console.log("Not Found\n First Player Added then Attacking Data");
          Players.create({
            firstName:name[0],
            lastName:name[1],
            clubName:club 
          }).then(result=>{
            Attacking.create({
              playerId:result.id,
              position: position,
              assists:assists,
              corner_taken:corner_taken,
              offsides:offsides,
              dribbles:dribbles,
              match_played:match_played
            }).then(result=>{
              console.log(result)
            }).catch(err=>{
              console.log(err)
            })
          
          }).catch(err=>{
            console.log(err);
          }
          )
        }

        else{
          Attacking.create({
            playerId:data.id,
            position: position,
            assists:assists,
            corner_taken:corner_taken,
            offsides:offsides,
            dribbles:dribbles,
            match_played:match_played
          }).then(result=>{
            console.log(result)
          }).catch(err=>{
            console.log(err)
          })
          }
        
      }).catch(err=>{
          console.log(err)
      })
    }})}

//migrateAttackingPlayerData()

//For Attempts Table
const migrateAttemptsData = () =>{
  csvtojson().fromFile("archive/"+files[1]).then(source => {    
    for(let i=0;i<source.length;i++)
    {
      let name=source[i].player_name.split(' ');
      let club=source[i].club;
      let position=source[i].position;
      let total_attempts=source[i].assists;
      let on_target=source[i].corner_taken;
      let off_target=source[i].offsides;
      let blocked=source[i].dribbles;
      let match_played=source[i].match_played;

      if(name[1]===undefined) name[1]='';

      findPlayer(name[0],name[1],club).then(data => {
        if(data === null)
        {

          //If Data is Not Avaiable then add the player then create then by 
          //the help of there id add to the attacking table
          console.log("Not Found\n First Player Added then Attacking Data");
          Players.create({
            firstName:name[0],
            lastName:name[1],
            clubName:club 
          }).then(result=>{
            //position,total_attempts,on_target,off_target,blocked,match_played
            Attempts.create({
              playerId:result.id,
              position: position,
              total_attempts: total_attempts,
              on_target: on_target,
              off_target:off_target,
              blocked: blocked,
              match_played:match_played
            }).then(result=>{
              console.log(result)
            }).catch(err=>{
              console.log(err)
            })
          
          }).catch(err=>{
            console.log(err);
          }
          )
        }

        else{
          Attempts.create({
            playerId:data.id,
              position: position,
              total_attempts: total_attempts,
              on_target: on_target,
              off_target:off_target,
              blocked: blocked,
              match_played:match_played
          }).then(result=>{
            console.log(result)
          }).catch(err=>{
            console.log(err)
          })
          }
        
      }).catch(err=>{
          console.log(err)
      })
    }})
}

//For Defending Table
const migrateDefendingData = () =>{
  csvtojson().fromFile("archive/"+files[2]).then(source => {    
    for(let i=0;i<source.length;i++)
    {
      let name=source[i].player_name.split(' ');
      let club=source[i].club;
      // position,balls_recoverd,tackles,t_won,t_lost,clearance_attempted,match_played
      let position=source[i].position;
      let balls_recoverd=source[i].balls_recoverd;
      let tackles=source[i].tackles;
      let t_won=source[i].t_won;
      let t_lost=source[i].t_lost;
      let clearance_attempted=source[i].clearance_attempted;
      let match_played=source[i].match_played;

      if(name[1]===undefined) name[1]='';

      findPlayer(name[0],name[1],club).then(data => {
        if(data === null)
        {

          //If Data is Not Avaiable then add the player then create then by 
          //the help of there id add to the attacking table
          console.log("Not Found\n First Player Added then Attacking Data");
          Players.create({
            firstName:name[0],
            lastName:name[1],
            clubName:club 
          }).then(result=>{
           // position,balls_recoverd,tackles,t_won,t_lost,clearance_attempted,match_played
            Defending.create({
              playerId:result.id,
              position: position,
              balls_recoverd: balls_recoverd,
              tackles: tackles,
              t_won:t_won,
              t_lost:t_lost,
              clearance_attempted:clearance_attempted,
              match_played:match_played

            }).then(result=>{
              console.log(result)
            }).catch(err=>{
              console.log(err)
            })
          
          }).catch(err=>{
            console.log(err);
          }
          )
        }

        else{
          Defending.create({
            playerId:data.id,
              position: position,
              balls_recoverd: balls_recoverd,
              tackles: tackles,
              t_won:t_won,
              t_lost:t_lost,
              clearance_attempted:clearance_attempted,
              match_played:match_played
          }).then(result=>{
            console.log(result)
          }).catch(err=>{
            console.log(err)
          })
          }
        
      }).catch(err=>{
          console.log(err)
      })
    }})
}

//For Disciplinary Table
const migrateDisciplinaryData = () =>{
  csvtojson().fromFile("archive/"+files[3]).then(source => {    
    for(let i=0;i<source.length;i++)
    {
      let name=source[i].player_name.split(' ');
      let club=source[i].club;
      //fouls_committed,fouls_suffered,red,yellow,minutes_played,match_played
      let position=source[i].position;
      let fouls_committed=source[i].fouls_committed;
      let fouls_suffered=source[i].fouls_suffered;
      let red=source[i].red;
      let yellow=source[i].yellow;
      let minutes_played=source[i].minutes_played;
      let match_played=source[i].match_played;

      if(name[1]===undefined) name[1]='';

      findPlayer(name[0],name[1],club).then(data => {
        if(data === null)
        {

          //If Data is Not Avaiable then add the player then create then by 
          //the help of there id add to the attacking table
          console.log("Not Found\n First Player Added then Attacking Data");
          Players.create({
            firstName:name[0],
            lastName:name[1],
            clubName:club 
          }).then(result=>{
            Disciplinary.create({
              playerId:result.id,
              position: position,
          //fouls_committed,fouls_suffered,red,yellow,minutes_played,match_played
      
              fouls_committed: fouls_committed,
              fouls_suffered:fouls_suffered,
              red: red,
              yellow: yellow, 
              minutes_played: minutes_played,             
              match_played:match_played

            }).then(result=>{
              console.log(result)
            }).catch(err=>{
              console.log(err)
            })
          
          }).catch(err=>{
            console.log(err);
          }
          )
        }

        else{
          Disciplinary.create({
            playerId:data.id,
              position: position,
              fouls_committed: fouls_committed,
              fouls_suffered:fouls_suffered,
              red: red,
              yellow: yellow, 
              minutes_played: minutes_played,             
              match_played:match_played
          }).then(result=>{
            console.log(result)
          }).catch(err=>{
            console.log(err)
          })
          }
        
      }).catch(err=>{
          console.log(err)
      })
    }})
}

//For Distribution Table
const migrateDistributionData = () =>{
  csvtojson().fromFile("archive/"+files[4]).then(source => {    
    for(let i=0;i<source.length;i++)
    {
      let name=source[i].player_name.split(' ');
      let club=source[i].club;
// pass_accuracy,pass_attempted,pass_completed,cross_accuracy,cross_attempted,cross_complted,freekicks_taken,match_played
      let position=source[i].position;
      let pass_accuracy=source[i].pass_accuracy;
      let pass_attempted=source[i].pass_attempted;
      let cross_accuracy=source[i].cross_accuracy;
      let cross_attempted=source[i].cross_attempted;
      let cross_complted=source[i].cross_complted;
      let freekicks_taken=source[i].freekicks_taken;
      let match_played=source[i].match_played;

      if(name[1]===undefined) name[1]='';

      findPlayer(name[0],name[1],club).then(data => {
        if(data === null)
        {

          //If Data is Not Avaiable then add the player then create then by 
          //the help of there id add to the attacking table
          console.log("Not Found\n First Player Added then Attacking Data");
          Players.create({
            firstName:name[0],
            lastName:name[1],
            clubName:club 
          }).then(result=>{
           // position,balls_recoverd,tackles,t_won,t_lost,clearance_attempted,match_played
           Distribution.create({
              playerId:result.id,
              position: position,
// pass_accuracy,pass_attempted,pass_completed,cross_accuracy,cross_attempted,cross_complted,freekicks_taken,match_played
              pass_accuracy: pass_accuracy,
              pass_attempted: pass_attempted,
              cross_accuracy: cross_accuracy,
              cross_attempted: cross_attempted,
              cross_complted: cross_complted,
              freekicks_taken:freekicks_taken,          
              match_played:match_played,
            }).then(result=>{
              console.log(result)
            }).catch(err=>{
              console.log(err)
            })
          
          }).catch(err=>{
            console.log(err);
          }
          )
        }

        else{
          Distribution.create({
            playerId:data.id,
              position: position,
              pass_accuracy: pass_accuracy,
              pass_attempted: pass_attempted,
              cross_accuracy: cross_accuracy,
              cross_attempted: cross_attempted,
              cross_complted: cross_complted,
              freekicks_taken:freekicks_taken,          
              match_played:match_played,
          }).then(result=>{
            console.log(result)
          }).catch(err=>{
            console.log(err)
          })
          }
        
      }).catch(err=>{
          console.log(err)
      })
    }})
}

//For GoalKeeping Table
const migrateGoalkeepingData = () =>{
  csvtojson().fromFile("archive/"+files[5]).then(source => {    
    for(let i=0;i<source.length;i++)
    {
      let name=source[i].player_name.split(' ');
      let club=source[i].club;
      
      //saved,conceded,saved_penalties,cleansheets,punches_made,match_played
      let position=source[i].position;
      let saved=source[i].saved;
      let conceded=source[i].conceded;
      let saved_penalties=source[i].saved_penalties;
      let cleansheets=source[i].cleansheets;
      let punches_made=source[i].punches_made;
      let match_played=source[i].match_played;

      if(name[1]===undefined) name[1]='';

      findPlayer(name[0],name[1],club).then(data => {
        if(data === null)
        {

          //If Data is Not Avaiable then add the player then create then by 
          //the help of there id add to the attacking table
          console.log("Not Found\n First Player Added then Attacking Data");
          Players.create({
            firstName:name[0],
            lastName:name[1],
            clubName:club 
          }).then(result=>{
            Goalkeeping.create({
              playerId:result.id,
              position: position,
              //saved,conceded,saved_penalties,cleansheets,punches_made,match_played
              saved: saved,
              conceded: conceded,
              saved_penalties:saved_penalties,
              cleansheets:cleansheets,
              punches_made:punches_made,
              match_played:match_played

            }).then(result=>{
              console.log(result)
            }).catch(err=>{
              console.log(err)
            })
          
          }).catch(err=>{
            console.log(err);
          }
          )
        }

        else{
          Goalkeeping.create({
            playerId:data.id,
              position: position,
              saved: saved,
              conceded: conceded,
              saved_penalties:saved_penalties,
              cleansheets:cleansheets,
              punches_made:punches_made,
              match_played:match_played
          }).then(result=>{
            console.log(result)
          }).catch(err=>{
            console.log(err)
          })
          }
        
      }).catch(err=>{
          console.log(err)
      })
    }})
}

//For Goals Table
const migrateGoalsData = () =>{
  csvtojson().fromFile("archive/"+files[6]).then(source => {    
    for(let i=0;i<source.length;i++)
    {
      let name=source[i].player_name.split(' ');
      let club=source[i].club;
      
//goals,right_foot,left_foot,headers,others,
      let position=source[i].position;
      let goals=source[i].goals;
      let right_foot=source[i].right_foot;
      let left_foot=source[i].left_foot;
      let headers=source[i].headers;
      let others=source[i].others;
//inside_area,outside_areas,penalties,match_played      
      let inside_area=source[i].inside_area;
      let outside_areas=source[i].outside_areas;
      let penalties=source[i].penalties;
      let match_played=source[i].match_played;

      if(name[1]===undefined) name[1]='';

      findPlayer(name[0],name[1],club).then(data => {
        if(data === null)
        {

          //If Data is Not Avaiable then add the player then create then by 
          //the help of there id add to the attacking table
          console.log("Not Found\n First Player Added then Attacking Data");
          Players.create({
            firstName:name[0],
            lastName:name[1],
            clubName:club 
          }).then(result=>{
            Goals.create({
              playerId:result.id,
              position: position,
//goals,right_foot,left_foot,headers,others,inside_area,outside_areas,penalties,match_played              
              goals: goals,
              right_foot: right_foot,
              left_foot:left_foot,
              headers:headers,
              others:others,
              inside_area:inside_area,
              outside_areas:outside_areas,
              penalties:penalties,
              match_played:match_played

            }).then(result=>{
              console.log(result)
            }).catch(err=>{
              console.log(err)
            })
          
          }).catch(err=>{
            console.log(err);
          }
          )
        }

        else{
          Goals.create({
            playerId:data.id,
              position: position,
              goals: goals,
              right_foot: right_foot,
              left_foot:left_foot,
              headers:headers,
              others:others,
              inside_area:inside_area,
              outside_areas:outside_areas,
              penalties:penalties,
              match_played:match_played
          }).then(result=>{
            console.log(result)
          }).catch(err=>{
            console.log(err)
          })
          }
        
      }).catch(err=>{
          console.log(err)
      })
    }})
}

//For Key_Stats Table
const migrateKeyStatsData = () =>{
  csvtojson().fromFile("archive/"+files[7]).then(source => {    
    for(let i=0;i<source.length;i++)
    {
      let name=source[i].player_name.split(' ');
      let club=source[i].club;
      
      //minutes_played,match_played,goals,assists,distance_covered
      let position=source[i].position;
      let minutes_played=source[i].minutes_played;
      let match_played=source[i].match_played;
      let goals=source[i].goals;
      let assists=source[i].assists;
      let distance_covered=source[i].distance_covered;
      
      if(name[1]===undefined) name[1]='';

      findPlayer(name[0],name[1],club).then(data => {
        if(data === null)
        {

          //If Data is Not Avaiable then add the player then create then by 
          //the help of there id add to the attacking table
          console.log("Not Found\n First Player Added then Attacking Data");
          Players.create({
            firstName:name[0],
            lastName:name[1],
            clubName:club 
          }).then(result=>{
            KeyStats.create({
              playerId:result.id,
              position: position,
//minutes_played,match_played,goals,assists,distance_covered
              minutes_played: minutes_played,
              match_played: match_played,
              goals:goals,
              assists:assists,
              distance_covered:distance_covered

            }).then(result=>{
              console.log(result)
            }).catch(err=>{
              console.log(err)
            })
          
          }).catch(err=>{
            console.log(err);
          }
          )
        }

        else{
          KeyStats.create({
            playerId:data.id,
              position: position,
              minutes_played: minutes_played,
              match_played: match_played,
              goals:goals,
              assists:assists,
              distance_covered:distance_covered
          }).then(result=>{
            console.log(result)
          }).catch(err=>{
            console.log(err)
          })
          }
        
      }).catch(err=>{
          console.log(err)
      })
    }})
}

// migrateUserData();
 migrateGoalsData();
// migrateKeyStatsData()
// migrateAttackingPlayerData()
// migrateAttemptsData()
// migrateDefendingData()
// migrateDisciplinaryData()
// migrateDistributionData()
// migrateGoalkeepingData()