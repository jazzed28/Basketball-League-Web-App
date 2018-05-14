# Basketball-League-Web-App

### Instruction
```
Basketball League Web App using React, Express, MangoDB
```

Currently in research stage

Step 1: Decides what stacks will be used. At the moment, for Frontend React & Redux with Bootstrap 4 will be used. For Backend, Node, Express, MangoDB.

Do the research on similar react app using login functionalitiy.


At first, I need to set up database structure. And using mock up tools like Sketch/Balsamiq Mockups I can do prototyping and planning out what I should do next.

After some research there will be limitation on using mangoDB as a main database. It should be more schemed well before starting this work.

After watching youtube preparation for web projects I should follow guidelines to make mockups and things using mockup tools.

## 1. DATA

| FIELDS    | TYPES  |
| -------   | -----  |
| Number    | Number |
| Firstname | String |
| Lastname  | String |
| Email     | String |
| Mobile    | String |


* Player (Player_ID, Number, Firstname, Lastname, Email, Mobile, Note)

* Team (Team_ID, User_Ref, roster[Player], TeamName)

* User (User_ID, Team_Ref, Username, Email, Password)

## 2. REST APIs - GET, POST, PUT, DELETE

Basic APIs for create, update, delete player's data

GET: /api/rosters/:team - get team's roster and players' data
GET: /api/rosters/:team/:player - get player's data
POST: /api/rosters/:team/:player - create a player for a specific team
PUT: /api/rosters/:team/:player - update a player's data
DELETE: /api/rosters/:team/:player - delete a player's data

## 3. MONGODB SETUP

With Heroku
Built starter package with Webpack 4

## 4. Webpack 4 starter setup

It will be server-side API app

