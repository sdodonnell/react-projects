import React from 'react'

class Weather extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      details: {}
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => getWeather(position));
  }

  getWeather(position) {
    fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          isLoaded: true,
          details: res.main
        })
      },
      error => {
        this.setState({
          error,
          isLoaded: true
        })
      })
  }
  
  render() {
    return (
      <div>
        <h1>Today's Weather</h1>
        <h3>May 15, 2019</h3>
        <img src="https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366021399"/>
        <p>Temp: 79ºF</p>
        <p>High: 80ºF</p>
        <p>Low: 75ºF</p>
        <p>Humidity: 100%</p>
      </div>
    )
  }
}

export default Weather
