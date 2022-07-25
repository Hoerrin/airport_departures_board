# Airport Departure Board

Simple JavaScript app made to improve my vanilla JS skills.
Idea came from YouTube video, but I've remade the app from ground up.

App can use static data or fetch data from API.
To fetch data form API you need to generate API key at https://rapidapi.com/aedbx-aedbx/api/aerodatabox/ 

Assign the key to const at the top of app.js file:
```bash
const APIKEY
```
 and uncomment:
```bash
let data = await getData()
```

By default reponse from API contains departure infromation from Wrocław (EPWR) airport for the next 12 hours.


!WARNING!
There's overage fees!
!WARNING!
## Run

Clone the project

```bash
  git clone https://github.com/Hoerrin/airport_departures_board
```

Go to the project directory and open index.html


## Screenshots

![App Screenshot](https://github.com/Hoerrin/airport_departures_board/blob/master/images/readme_gif.gif)

