import React from 'react'

class Weather extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      details: {}
    }
    this.getWeather = this.getWeather.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => this.getWeather(position));
  }

  getWeather(position) {
    console.log('About to fetch...');
    fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          isLoaded: true,
          details: res
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
    const { isLoaded, error, details } = this.state;
    const { name, main, weather } = details;
    const date = new Date(Date.now()).toDateString();

    if (!isLoaded) {
      return (
        <div>
          <p>Please allow access to your location.</p>
        </div>
      )
    } else {

      const { icon } = weather[0]
      return (
        <div>
          <h1>Today's Weather</h1>
          <h2>Your Location: { name }</h2>
          <h3>{ date }</h3>
          <img src={ icon }/>
          <p>Temp: { main.temp }</p>
          <p>High: { main.temp_max }</p>
          <p>Low: { main.temp_min }</p>
          <p>Humidity: { main.humidity }</p>
        </div>
      )
    }
  }
}

export default Weather
