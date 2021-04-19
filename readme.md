# DOCUMENTATION

## Run in local
```
node app.js
```

## API Requests Routes

### Server Lobby Routes:    
[link](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/lobby.js)    
#### /lobby: POST    
Makes lobby and creates first user(the owner)    

#### /lobby/join: POST    
Join lobby and creates second user(the owner)    

#### /lobby/leave: POST    
Deletes user and all related objects/changes    

#### /lobby/charactersAvailable/:sessionID: GET    
Dynamic list of characters to choose from    

#### /lobby/selectcharacter: POST    
Makes lobby and first user(the owner)    

#### /lobby/characterInLoaded/:sessionID/:username/:gameID  
Makes lobby and first user(the owner)   

#### /lobby/updateCharactersToGame/: POST    
Makes lobby and first user(the owner)   

#### /lobby/noChar/:sessionID: GET    
Makes lobby and first user(the owner)    

### Initialization Routes    
[link](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/index.js)    
#### /initializeGame: POST   
[link](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/generateround.js)    
#### /generateRounds/initializeGenerator: POST    
#### /generateRounds/generateRounds: POST    
[link](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/generatehostage.js)    
#### /generateHostages/initializeGenerator: POST    
#### /generateHostages/generateHostages: POST    
### Action Routes    
part1: [here](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/action.js)    
part2: [here](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/action2.js)    
#### /action/boardHorseExtension: POST    
#### /action/drawInitial: POST    
#### /action/draw: POST    
#### /action/playActionCard: POST    
#### /action/updateWhisky: POST    
#### /action/punchByName: POST    
#### /action/steal: POST    
#### /action/kidnap: POST    
#### /action/drop: POST    
#### /action/spawnStrongBox: POST   
#### /action/shootByName: POST    
#### /action/generalMovementByName: POST    
#### /action/rideHorse: POST    
#### /action/moveHorseAtCar: POST    
#### /action/removeHorseAtCar: POST    
#### /action/moveStageCoach: POST    
### Car Routes    
[link](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/car.js)    
#### /car/lootInCar/:gameID/:carNo: GET    
#### /car/lootOnRoofCar/:gameID/:carNo: GET    
#### /car/charactersInCar/:gameID/:carNo: GET    
#### /car/playerCharactersInCar/:gameID/:carNo: GET    
#### /car/charactersOnRoofCar/:gameID/:carNo: GET    
#### /car/playerCharactersOnRoofCar/:gameID/:carNo: GET    
#### /car/charactersAtCar/:gameID/:carNo: GET    
#### /car/playerCharactersAtCar/:gameID/:carNo: GET    
#### /car/horsesAtCar/:gameID/:carNo: GET    
### StageCoach Routes
[link](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/stagecoach.js)
#### /stagecoach/lootInStageCoach/:gameID: GET    
#### /stagecoach/lootOnRoofStageCoach/:gameID: GET    
#### /stagecoach/charactersInStageCoach/:gameID: GET    
#### /stagecoach/charactersOnRoofStageCoach/:gameID: GET    
#### /stagecoach/horsesAtStageCoach/:gameID: GET    
#### /stagecoach/hostagesAtStageCoach/:gameID: GET    
#### /stagecoach/position/:gameID: GET

### Game Status Routes    
[link](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/gamestatus.js)    
#### /gamestatus/start: POST    
#### /gamestatus/started/:sessionID: GET    
#### /gamestatus/allAboard/:gameID: GET    
#### /gamestatus/isLoaded/:sessionID: GET    
### Lobby Status Routes    
[link](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/lobbystatus.js)    
#### /lobbystatus/ready: POST    
#### /lobbystatus/allReady/:sessionID: GET    
### Horse Routes    
[link](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/horse.js)    
#### /horse/allHorses/:gameID: GET    
### ID Routes    
[link](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/id.js)    
#### /gameID/:sessionID: GET    
#### /trainID/:gameID: GET    
#### /stageCoachID/:gameID: GET    
#### /roundID/:gameID: GET    
#### /characterID/:gameID/:name: GET    
### Phase Routes    
[link](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/phase.js)    
#### /phase/isStealin/:gameID: GET    
#### /phase/isStealin: POST    
### Round Routes    
[link](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/round.js)    
#### /round/actionStackOld/:gameID: GET    
#### /round/actionStack/:gameID: GET    
#### /round/endOfRound: POST    
#### /round/currentRoundNumber/:gameID: GET    
#### /round/currentRound/:gameID: GET    
### Turn Routes    
[link](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/turn.js)    
#### /turn/next/:gameID: GET    
#### /turn/next: POST    
#### /turn/endOfTurn: POST    
#### /turn/currentTurnIndex/:gameID: GET    
### Save Routes    
[link](https://github.com/wenlong-s118/Game-Server/blob/master/apiRoutes/turn.js)    
#### /save: POST    
#### /allSavedGames/:username: GET    
#### /load: POST    
