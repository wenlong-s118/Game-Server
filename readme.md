# DOCUMENTATION

## Run in local
```
node app.js
```

## API Requests Routes

### Intialize/Save/Load Routes
#### /initializeGame: POST
Creates game, trains, stagecoach, carts, loot, whisky, etc.
&nbsp;
#### /saveGame: POST
Turns game object into savedGame object
&nbsp;
#### /loadGame: POST
Turns savedGame object into game object
&nbsp;
&nbsp;
### Train Routes:
#### /trainCarts: GET
lists all specific carts to a specific train
&nbsp;
#### /trainWhisky: GET
lists whisky pertaining to specific train/game: no post route to be provided
&nbsp;
#### /trainLoot: GET
loot pertaining to a specific train/game: not post route to be provided
&nbsp;
&nbsp;
### Cart Routes:
#### /cartWhisky: GET
lists all whisky within a given cart
&nbsp;
#### /cartLoot: GET
lists all loot within a given cart
&nbsp;
&nbsp;
### Character Routes:
#### /characterLoot: GET
loot picked up by specific character
&nbsp;
#### /characterPosition: GET
returns cart number and roof boolean.
&nbsp;
#### /characterCart: GET
returns cart number character is in
&nbsp;
&nbsp;
### Action Helper Routes
#### /adjacentCarts: GET
For non-roof shootings: returns what carts are next to this cart(who can be shot)
&nbsp;
#### /cartRoofIsClear: GET
check if can shoot beyond this car roof
&nbsp;
#### /charactersInCart: GET
Characters in a specific cart
&nbsp;
#### /charactersOnCartRoof: GET
Characters on the roof of a specific cart
&nbsp;
#### /charactersAtCart: GET
Character in a specific cart or on its roof
&nbsp;
#### /getShootablePlayers
Returns list of players can be shot
&nbsp;
#### /aShootsB: POST
Bullet card of a goes to b
&nbsp;
#### /getPunchablePlayers
Returns list of players to be punched
&nbsp;
#### /aPunchesB: POST
B drops loot
&nbsp;
#### /characterMovesToCart: POST
character moves from cart # to cart #
&nbsp;
#### /characterMovesMarshal: POST
character moves marshal from cart # to cart #
&nbsp;
#### /characterTakesLoot: POST
loot cartId deleted and characterID updated to who pics it up
&nbsp;
#### /characterTakesWhisky: POST
whisky cartId deleted and characterID updated to who pics it up
&nbsp;
#### /characterMovesToStageCoach: POST
character moves from cart # to stagecoach
&nbsp;
#### /getPossibleHostages: GET
returns list of kidnappable hostages
&nbsp;
#### /characterTakesHostage: POST
character a takes hostage f
&nbsp;
#### /characterMovesUpDown: POST
characters moves to or from roof
&nbsp;
