/*--------------API-KEY--------------*/
const APIKEY = null;
/*-----------------------------------*/

/*-------------Properties------------*/
const ROWQUANTITY = 15;

const INTERVALS = {
    ROW_INTERVAL: 200,
    FLAP_INTERVAL: 80
}

const flapsInColumn = {
    time: 6,
    flightNumber: 8,
    airline: 15,
    destination: 15,
    remarks: 8
}
/*-----------------------------------*/


let flights = {

}

const dateNow = new Date().toISOString().slice(0, 16)
const dateNext12h = new Date(Date.now() + (3600 * 1000 * 12)).toISOString().slice(0, 16)

const getData = async () => {
    return await fetch(`https://aerodatabox.p.rapidapi.com/flights/airports/icao/EPWR/${dateNow}/${dateNext12h}?direction=Departure&withCancelled=true&withCodeshared=true&withLocation=false`,
        {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': APIKEY,
                'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
            }
        })
        .then(response => response.json())
}

const assignData = (data) => {
    for (let i = 0; i < data.departures.length; i++) {
        flights[i] = {
            time: new Date(data.departures[i].movement.scheduledTimeLocal).toLocaleTimeString().slice(0, 5),
            flightNumber: data.departures[i].number,
            airline: data.departures[i].airline.name,
            destination: data.departures[i].movement.airport.name,
            remarks: data.departures[i].status
        }
    }
}

const generateTable = () => {
    const tableBody = document.getElementsByClassName("table__body")[0];

    for (let i = 1; i <= ROWQUANTITY; i++) {
        row = document.createElement("tr")
        row.setAttribute("id", `row${i}`)
        row.setAttribute("class", `row`)

        for (let j = 1; j <= Object.keys(flapsInColumn).length; j++) {
            column = document.createElement("td")
            table = document.createElement("table")
            table.setAttribute("class", `flap--container`)
            column.setAttribute("id", `row${i}column${j}`)
            column.setAttribute("class", `column`)

            for (let k = 1; k <= Object.values(flapsInColumn)[j - 1]; k++) {
                flap = document.createElement("td")
                flap.setAttribute("id", `row${i}column${j}flap${k}`)
                flap.setAttribute("class", `flap`)
                table.append(flap)
            }
            column.append(table)
            row.append(column)
        }

        tableBody.append(row)
    }
}

const poopulateRow = async (row) => {
    //column
    for (let i = 1; i <= Object.keys(flapsInColumn).length; i++) {
        //flap
        for (let j = 1; j <= Object.values(flapsInColumn)[i - 1] && j <= Object.values(flights[row - 1])[i - 1].length; j++) {
            const flap = document.getElementById(`row${row}column${i}flap${j}`)
            
            setTimeout(() => {
                flap.innerHTML = Object.values(flights[row - 1])[i - 1][j - 1].toUpperCase()
                flap.setAttribute('class', 'flap flap--rotate')
              }, INTERVALS.FLAP_INTERVAL*j);
        }
    }
}

const populateDepartures = async () => {
    const tableBody = document.getElementsByClassName("table__body")[0];
    generateTable()

    try {
        /*-----------Select API or static data-----------*/
                /*------Get data from API------*/
        //let data = await getData()
                /*-------Get static data-------*/
        let data = {
        /*-----------------------------------------------*/
            "departures":
                [{
                    "movement":
                    {
                        "airport": {
                            "icao": "LMML", "iata": "MLA", "name": "Luqa"
                        },
                        "scheduledTimeLocal": "2022-07-24 22:14+02:00",
                        "actualTimeLocal": "2022-07-24 22:14+02:00",
                        "runwayTimeLocal": "2022-07-24 22:14+02:00",
                        "scheduledTimeUtc": "2022-07-24 20:14Z",
                        "actualTimeUtc": "2022-07-24 20:14Z",
                        "runwayTimeUtc": "2022-07-24 20:14Z",
                        "quality": ["Basic", "Live"]
                    },
                    "number": "FR 181F",
                    "callSign": "RYR181F",
                    "status": "Departed",
                    "codeshareStatus": "IsOperator",
                    "isCargo": false,
                    "aircraft": {
                        "reg": "9H-QDD",
                        "modeS": "4D225C"
                        , "model": "Boeing 737-800"
                    },
                    "airline": {
                        "name": "Ryanair"
                    }
                },
                {
                    "movement": {
                        "airport": {
                            "icao": "EDDF",
                            "iata": "FRA",
                            "name": "Frankfurt-am-Main"
                        },
                        "scheduledTimeLocal": "2022-07-25 06:40+02:00",
                        "scheduledTimeUtc": "2022-07-25 04:40Z",
                        "quality": ["Basic"]
                    },
                    "number": "LH 1375",
                    "status": "Unknown",
                    "codeshareStatus": "IsOperator",
                    "isCargo": false,
                    "aircraft": {
                        "reg": "D-ACNJ",
                        "modeS": "3C4DCA",
                        "model": "Bombardier CRJ900"
                    },
                    "airline": {
                        "name": "Lufthansa"
                    }
                },
                {
                    "movement": {
                        "airport": {
                            "icao": "EINN",
                            "iata": "SNN",
                            "name": "Limerick city"
                        },
                        "scheduledTimeLocal": "2022-07-25 07:15+02:00",
                        "scheduledTimeUtc": "2022-07-25 05:15Z",
                        "quality": ["Basic"]
                    }, "number": "FR 1173",
                    "status": "Unknown",
                    "codeshareStatus": "IsOperator",
                    "isCargo": false,
                    "aircraft": {
                        "model": "Boeing 737-800"
                    },
                    "airline": {
                        "name": "Ryanair"
                    }
                },
                {
                    "movement": {
                        "airport": {
                            "icao": "ENTO",
                            "iata": "TRF",
                            "name": "Torp"
                        },
                        "scheduledTimeLocal": "2022-07-25 06:10+02:00",
                        "scheduledTimeUtc": "2022-07-25 04:10Z",
                        "quality": ["Basic"]
                    }, "number": "W6 1879",
                    "status": "Unknown",
                    "codeshareStatus": "IsOperator",
                    "isCargo": false,
                    "aircraft": {
                        "model": "Airbus A320"
                    },
                    "airline": {
                        "name": "Wizz Air"
                    }
                },
                {
                    "movement": {
                        "airport": {
                            "icao": "EPGD",
                            "iata": "GDN",
                            "name": "Gdańsk"
                        },
                        "scheduledTimeLocal": "2022-07-24 20:40+02:00",
                        "actualTimeLocal": "2022-07-24 22:22+02:00",
                        "runwayTimeLocal": "2022-07-24 22:22+02:00",
                        "scheduledTimeUtc": "2022-07-24 18:40Z",
                        "actualTimeUtc": "2022-07-24 20:22Z",
                        "runwayTimeUtc": "2022-07-24 20:22Z",
                        "quality": ["Basic", "Live"]
                    },
                    "number": "FR 4105",
                    "callSign": "RYR69PH", "status": "Departed", "codeshareStatus": "IsOperator", "isCargo": false, "aircraft": { "reg": "EI-DYN", "modeS": "4CA6A3", "model": "Boeing 737-800" }, "airline": { "name": "Ryanair" }
                }, { "movement": { "airport": { "icao": "EPWA", "iata": "WAW", "name": "Warsaw" }, "scheduledTimeLocal": "2022-07-24 21:25+02:00", "actualTimeLocal": "2022-07-24 21:20+02:00", "runwayTimeLocal": "2022-07-24 21:20+02:00", "scheduledTimeUtc": "2022-07-24 19:25Z", "actualTimeUtc": "2022-07-24 19:20Z", "runwayTimeUtc": "2022-07-24 19:20Z", "quality": ["Basic", "Live"] }, "number": "LO 3860", "callSign": "LOT3860", "status": "Departed", "codeshareStatus": "IsOperator", "isCargo": false, "aircraft": { "reg": "SP-EQL", "modeS": "48932B", "model": "De Havilland Canada DHC-8-400 Dash 8Q" }, "airline": { "name": "LOT - Polish" } }, { "movement": { "airport": { "icao": "EPWA", "iata": "WAW", "name": "Warsaw" }, "scheduledTimeLocal": "2022-07-25 05:30+02:00", "scheduledTimeUtc": "2022-07-25 03:30Z", "quality": ["Basic"] }, "number": "LO 3850", "status": "Unknown", "codeshareStatus": "Unknown", "isCargo": false, "aircraft": { "model": "Embraer 170" }, "airline": { "name": "LOT - Polish" } }, { "movement": { "airport": { "icao": "EPWA", "iata": "WAW", "name": "Warsaw" }, "scheduledTimeLocal": "2022-07-25 08:45+02:00", "scheduledTimeUtc": "2022-07-25 06:45Z", "quality": ["Basic"] }, "number": "LO 3852", "status": "Unknown", "codeshareStatus": "Unknown", "isCargo": false, "aircraft": { "model": "Embraer 195" }, "airline": { "name": "LOT - Polish" } }, { "movement": { "airport": { "icao": "LIPH", "iata": "TSF", "name": "Treviso" }, "scheduledTimeLocal": "2022-07-25 07:30+02:00", "scheduledTimeUtc": "2022-07-25 05:30Z", "quality": ["Basic"] }, "number": "FR 1880", "status": "Unknown", "codeshareStatus": "Unknown", "isCargo": false, "aircraft": { "model": "Boeing 737-800" }, "airline": { "name": "Ryanair" } }]
        }

        //Sort flight by time of departure
        await data.departures.sort((a, b) => new Date(a.movement.scheduledTimeLocal).getTime() - new Date(b.movement.scheduledTimeLocal).getTime());

        await assignData(data)
        for (let i = 1; i <= Object.keys(flights).length && i <= ROWQUANTITY; i++) {
            setTimeout(() => poopulateRow(i), INTERVALS.ROW_INTERVAL*i)
        }
    } catch (error) {
        console.log(error)
    }
}


populateDepartures()

