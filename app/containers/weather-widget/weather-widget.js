import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux';
import { fetchData } from 'actions/weather-widget-actions';

import { Link, browserHistory } from 'react-router'

const getURLParam = (oTarget, sVar) => {
  return decodeURI(oTarget.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURI(sVar).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
};

class WeatherWidget extends Component {

  static propTypes = {
    weather: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
    updatePosition: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      lat: 0,
      lng: 0
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.props.updatePosition(pos.coords.latitude, pos.coords.longitude)
      },
      err => {
        console.log('cannot get position')
      },
      { timeout: 1000 }
    )

    this.initialize();
  }

  componentDidUpdate(props) {
    clearInterval(this.timer);
    const { lat, lng } = props.weather
    if (lat !== this.state.lat || lng !== this.state.lng) {
      this.setState({ lat, lng })
      this.props.fetchData(lat, lng)
    }
  }

  initialize() {

    const { lat, lng } = this.state

    // interval
    this.props.fetchData(lat, lng);
    this.timer = setInterval(() => {
      this.props.fetchData(this.state.lat, this.state.lng);
    }, 300000);  // 5 min
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {

    const unitsParam = getURLParam(window.location, 'u').toUpperCase();

    const units = unitsParam || this.props.weather.units

    const { icon } = this.props.weather

    let deg = this.props.weather.degree
    let speed = this.props.weather.windSpeed
    let speedUnits = 'mp/h'

    if (units === 'C') {
      deg = ((deg - 32) * 5 / 9).toFixed(2)
      speed = (speed * 1.609344).toFixed(2)
      speedUnits = 'km/h'
    }

    const { lat, lng } = this.state

    return (
      <div className="card weather-widget">
        <div className="row">
          <div className="col-xs-12 weather-title">
            <h4>{this.props.weather.title}</h4>
          </div>
        </div>
        <div className="row">
          <div
            className="col-xs-2 col-xs-offset-1" style={{ textAlign: 'center' }}>
            <img src={icon ? `http://openweathermap.org/img/w/${icon}.png` : ''} />
          </div>
          <div className="col-xs-8">
            <h4>{this.props.weather.city}</h4>
            <div>

              {deg}°{units}

              &nbsp;

              {
                this.props.weather.showWind
                  ?
                  `Wind: ${speed} ${speedUnits}`
                  : '\u00a0'
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { weather } = state;
  return {
    weather: weather,
  };
}

export default connect(
  mapStateToProps,
  { fetchData }
)(WeatherWidget);