import React from 'react'
import NavBar from './components/NavBar'
import TrainTable from './components/TrainTable'

function App() {

  const [arrivalData, setArrivalData] = React.useState([])
  const [departData, setDepartData] = React.useState([])

  let date = new Date()
  let dateStringArr = date.toString().split(' ')
  let hour = date.getHours()
  let minute = date.getMinutes()

  if(minute.toString().length < 2) minute = `0` + minute

  let currTime; 

  hour > 12 ? currTime = `${hour - 12}:${minute} PM` : currTime = `${hour}:${minute} AM`

  let dateStd = `${dateStringArr[0]} ${dateStringArr[1]} ${dateStringArr[2]} ${dateStringArr[3]}`

    React.useEffect(() => {

        fetch('http://localhost:8080/trainData')
        .then(response => { 
            if(response.ok) {
                return response.json()
            } else {
                throw response
            }})
        .then(response => {
            let arrivalArr = []
            let departArr = []
            for(const route in response) {
                for(const trains in response[route]) {

                    let trainNumber = route.toString().split("-")
                    trainNumber = trainNumber[3]

                    response[route][trains].trainNumber = trainNumber

                    if(response[route][trains].attributes.arrival_time === null) {
                        let date = new Date(response[route][trains].attributes.departure_time)
                        let now = new Date()
                        if (date >= now) {
                            departArr.push(response[route][trains])
                        }
                    } else {
                        let date = new Date(response[route][trains].attributes.arrival_time)
                        let now = new Date()
                        if (date >= now) {
                            arrivalArr.push(response[route][trains])
                        }
                    }
                }
            }

            arrivalArr = arrivalArr.sort((a,b) => new Date(a.attributes.arrival_time) - new Date(b.attributes.arrival_time))
            departArr = departArr.sort((a,b) => new Date(a.attributes.departure_time) - new Date(b.attributes.departure_time))
  
            setArrivalData(arrivalArr.splice(0,5))
            setDepartData(departArr.splice(0,20))
        })
        .catch((err) => {
            throw err
        })

    }, [])

  return (
    <div>
      <NavBar>NORTH STATION TERMINAL INFORMATION</NavBar>
      <div style={{
        display:'flex', 
        flexDirection:'row', 
        width:'100%',
        justifyContent:'space-evenly', 
        alignItems:'center',
        margin:'0'
        }}>
          <p>{dateStd}</p>
          <p>{currTime}</p>
      </div>
      <TrainTable arrivalData={arrivalData} departData={departData}/>
    </div>
  );
}

export default App;
