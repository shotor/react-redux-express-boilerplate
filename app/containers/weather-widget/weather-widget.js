import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom'
import classNames from 'classnames';
import { connect } from 'react-redux';
import { fetchData } from 'actions/weather-widget-actions';
import {
  Cloudy, Fair, Flurries, Rainy, SunShower, Sunny, ThunderStorm, Windy
} from 'components/weather-widget';

import { Link, browserHistory } from 'react-router'

const getURLParam = (oTarget, sVar) => {
  return decodeURI(oTarget.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURI(sVar).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
};

class WeatherWidget extends Component {

  static propTypes = {
    weather: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }

  constructor() {
    super();
    this.state = {
      units: 'F',
      moreDetail: false,
    };   // default
  }

  componentDidMount() {
    let city = this.props.weather.city;   // default

    // pass location by param

    const localParam = getURLParam(window.location, 'l');
    if (localParam) {
      city = localParam;
      if (window.localStorage) window.localStorage.setItem('localtion', localParam);
    } else if (window.localStorage && window.localStorage.getItem('localtion')) {
      city = window.localStorage.getItem('localtion');
    }

    // pass units of temperature by param
    const unitsParam = getURLParam(window.location, 'u').toUpperCase();
    if (unitsParam) {
      this.setState({ units: unitsParam });
      if (window.localStorage) window.localStorage.setItem('units', unitsParam);
    } else {
      this.setState({ units: this.props.weather.units })
    }

    // interval
    this.props.fetchData(city);
    this.timer = setInterval(() => {
      this.props.fetchData(city);
    }, 300000);  // 5 min
  }

  componentDidUpdate() {
    const getCelsius = (f) => {
      return Math.floor((f - 32) / 1.8);
    }

    const $degreeElement = findDOMNode(this.refs.degree);
    const $highTempElement = findDOMNode(this.refs.highTemp);
    const $lowTempElement = findDOMNode(this.refs.lowTemp);

    const {
      degree,
      high,
      low
    } = this.props.weather;

    if (degree !== '--') {
      $degreeElement.innerHTML = (this.props.weather.units === 'C') ? getCelsius(degree) : degree;
      if ($highTempElement && $lowTempElement) {
        $highTempElement.innerHTML = (this.props.weather.units === 'C') ? getCelsius(high) : high;
        $lowTempElement.innerHTML = (this.props.weather.units === 'C') ? getCelsius(low) : low;
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onClickLocationDetail(e) {
    if (this.props.weather.showWind) {
      const currentTarget = e.currentTarget;
      const toggleMoreDetail = !this.state.moreDetail;
      this.setState({ moreDetail: toggleMoreDetail });
    }
  }

  formatDate(date) {
    const monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "June", "July",
      "Aug", "Sept", "Oct",
      "Nov", "Dec"
    ]

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  render() {

    const mapping = {
      201: <ThunderStorm />,
      202: <ThunderStorm />,
      203: <ThunderStorm />,
      210: <ThunderStorm />,
      211: <ThunderStorm />,
      212: <ThunderStorm />,
      221: <ThunderStorm />,
      230: <ThunderStorm />,
      231: <ThunderStorm />,
      232: <ThunderStorm />,
      301: <Rainy />,
      302: <Rainy />,
      310: <Rainy />,
      311: <Rainy />,
      312: <Rainy />,
      313: <Rainy />,
      314: <Rainy />,
      321: <Rainy />,
      500: <Rainy />,
      501: <Rainy />,
      502: <Rainy />,
      503: <Rainy />,
      504: <Rainy />,
      511: <Rainy />,
      520: <Rainy />,
      521: <Rainy />,
      522: <Rainy />,
      531: <Rainy />,
      600: <Flurries />,
      601: <Flurries />,
      602: <Flurries />,
      611: <Rainy />,
      612: <Rainy />,
      615: <Flurries />,
      616: <Rainy />,
      620: <Flurries />,
      621: <Flurries />,
      622: <Flurries />,
      701: <Cloudy />,
      711: <Cloudy />,
      721: <Cloudy />,
      731: <Cloudy />,
      741: <Cloudy />,
      751: <Cloudy />,
      761: <Cloudy />,
      771: <Cloudy />,
      781: <Cloudy />,
      800: <Sunny />,
      1800: <Sunny night={true} />,
      801: <Cloudy />,
      1801: <Fair />,
      1802: <Fair night={true} />,
      802: <Cloudy />,
      803: <Cloudy />,
      804: <Cloudy />,
      901: <SunShower />,
      902: <Windy />,
      903: <Windy />,
      904: <Windy />,
      905: <Windy />,
      906: <Rainy />,
      951: <SunShower />,
      952: <Windy />,
      953: <Windy />,
      954: <Windy />,
      955: <Windy />,
      956: <Rainy />,
      957: <Rainy />,
      958: <Rainy />,
      959: <Rainy />,
      960: <Rainy />,
      961: <Rainy />,
      962: <Rainy />,
    };

    const {
      local,
      date,
      humidity,
      windSpeed,
      type,
      degree,
      high,
      low,
      code,
      day,
      forecast
    } = this.props.weather;

    const days = {
      0: 'SUN',
      1: 'MON',
      2: 'TUE',
      3: 'WED',
      4: 'THU',
      5: 'FRI',
      6: 'SAT',
    }

    const forecastNextDays = forecast.slice(0, 5).map((value, index) => {
      const date = new Date(value.dt * 1000)
      const currentDay = days[date.getDay()]
      return (
        <li key={index} ref={value}
          className={classNames('weather-day', { 'is-today': index === 0 })}>
          <span className="weather-weekday">{currentDay}</span>
          {mapping[value.weather[0].id]}
        </li>
      );
    });

    return (
      <div className="weather">
        <div className="weather-title">
          {this.props.weather.title}
        </div>
        <div className="weather-today">
          <div className="weather-icon">
            {mapping[code]}
          </div>
          <div className="weather-info">
            <div className="weather-detail"
              onClick={this.onClickLocationDetail.bind(this)}>
              <span className="weather-local">{local}</span>
              {this.state.moreDetail ?
                <div className="weather-more">
                  <div className="weather-moreTemp">
                    <span className="weather-high" ref="highTemp">{high}</span>
                    <span className="weather-low" ref="lowTemp">{low}</span>
                  </div>
                  <div className="weather-moreDetail">
                    <span className="weather-windSpeed">&#9873; {windSpeed} mph</span>
                    <span className="weather-humidity">&#9748; {humidity} g/m3</span>
                  </div>
                </div>
                :
                <div>
                  <span className="weather-date">{this.formatDate(new Date(date * 1000))}</span>
                  <span className="weather-type">{type}</span>
                </div>
              }
            </div>
            <div className="weather-temp">
              <span className="weather-degree">
                <span ref="degree">{degree}</span>
                <span className="weather-temperature">
                  {this.props.weather.units}
                </span>
              </span>
            </div>
            <div
              className="weather-wind"
              style={{
                color: '#9e9e9e',
                fontSize: '12px',
                clear: 'both'
              }}>
              {
                this.props.weather.showWind 
                  ? `Wind: ${windSpeed} mph`
                  : '\u00a0'
              }
            </div>
          </div>
        </div>
        <div className="weather-week">
          <ul className="weather-days">
            {forecastNextDays}
          </ul>
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