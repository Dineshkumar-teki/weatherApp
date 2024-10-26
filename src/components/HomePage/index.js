import {useEffect, useState} from 'react'
import './style.css'

const HomePage = () => {
  const [cityName, setCityName] = useState('')
  const [userInput, setUserInput] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api1 = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=423e0e21821931d7fa93dbc26419c467`
        const res1 = await fetch(api1)
        let latitude
        let longitude
        if (res1.status === 200) {
          const data1 = await res1.json()
          const {lat, lon} = data1[0]
          latitude = lat
          longitude = lon
        }

        const api2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=423e0e21821931d7fa93dbc26419c467`
        const res2 = await fetch(api2)
        if (res2.status === 200) {
          const data2 = await res2.json()
          setWeather(data2)
        } else {
          console.log('something went wrong')
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [cityName])

  const handleClick = () => {
    userInput && setCityName(userInput)
    setUserInput('')
  }

  console.log(userInput)

  return (
    <section>
      <div className="heroSection">
        <div>
          <input
            type="search"
            placeholder="Enter city name"
            className="searchInput"
            value={userInput}
            onChange={e => {
              setUserInput(e.target.value)
            }}
          />
          <button type="button" className="searchBtn" onClick={handleClick}>
            Search
          </button>
        </div>
      </div>
      <div className="homeSection">
        {weather && (
          <div className="weatherCard">
            <div className="cardSection">
              <h3>City Name:</h3>
              <p>{weather.name}</p>
            </div>
            <div className="cardSection">
              <h3>Temperature:</h3>
              <p>{weather.main.temp}f</p>
            </div>
            <div className="cardSection">
              <h3>Humidity:</h3>
              <p>{weather.main.humidity}</p>
            </div>
            <div className="cardSection">
              <h3>Wind speed:</h3>
              <p>{weather.wind.speed}km/h</p>
            </div>
            <div className="cardSection">
              <h3>Weather conditions:</h3>
              <p>{weather.weather[0].main}</p>
              <img
                src={weather.weather[0].icon}
                alt={weather.weather[0].main}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default HomePage
