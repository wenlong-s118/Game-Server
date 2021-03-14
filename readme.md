# DOCUMENTATION

## Run in local
```
node app.js
```

## API Requests Routes

### Intialize/Save/Load Routes
#### /initializeGame:
Creates game, trains, stagecoach, carts, loot, whisky, etc.


#### /saveGame:
Turns game object into savedGame object


#### /loadGame:
Turns savedGame object into game object


### Train Routes:
#### /trainCarts:
lists all specific carts to a specific train


#### /trainWhisky:
lists whisky pertaining to specific train/game: no post route to be provided

#### /trainLoot:
loot pertaining to a specific train/game: not post route to be provided




### Cart Routes:
#### /cartWhisky: GET
lists all whisky within a given cart


#### /characterTakesLoot: POST
loot cartId deleted and characterID updated to who pics it up


#### /cartLoot: GET
lists all loot within a given cart


#### /characterTakesWhisky: POST
whisky cartId deleted and characterID updated to who pics it up




### Character Routes:
#### /characterLoot: GET
loot picked up by specific character


#### /characterPosition: GET
returns cart number and roof boolean.


#### /characterCart: GET
returns cart number character is in




### Action Helper Routes
#### /adjacentCarts: GET
For non-roof shootings: returns what carts are next to this cart(who can be shot)


#### /cartRoofIsClear: GET
check if can shoot beyond this car roof


#### /charactersInCart: GET
Characters in a specific cart


#### /charactersOnCartRoof: GET
Characters on the roof of a specific cart


#### /charactersAtCart: GET
Character in a specific cart or on its roof


#### /aShootsB:
Bullet card of a goes to b
