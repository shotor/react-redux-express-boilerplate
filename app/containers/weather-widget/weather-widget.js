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
    fetchData: PropTypes.func.isRequired
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

  update(params) {

    const { units, title } = this.state
    const location = getURLParam(window.location, 'l')

    //const query = [['u' , units], ['t', title], ['l', location]]
    //.reduce((xs, x) => `${xs}${x[0]}=${x[1]}&`, '?')

    //browserHistory.push(`/${query.slice(0, query.length)}`)
  }

  onClickLocationDetail(e) {
    if (this.props.weather.showWind) {
      const currentTarget = e.currentTarget;
      const toggleMoreDetail = !this.state.moreDetail;
      this.setState({ moreDetail: toggleMoreDetail });
    }
  }

  onClickTemperatureUnit(e) {
    // const target = e.currentTarget;
    // const units = (target.innerHTML === 'F') ? 'C' : 'F';
    // this.setState({ units: units });
    // this.update()

    // if (window.localStorage) window.localStorage.setItem('units', units);
  }

  render() {
    const mapping = [
      <Windy />,               //  0. tornado
      <SunShower />,           //  1. tropical storm
      <Windy />,               //  2. hurricane
      <ThunderStorm />,        //  3. severe thunderstorms
      <ThunderStorm />,        //  4. thunderstorms
      <Rainy />,               //  5. mixed rain and snow
      <Rainy />,               //  6. mixed rain and sleet
      <Flurries />,            //  7. mixed snow and sleet
      <Rainy />,               //  8. freezing drizzle
      <Rainy />,               //  9. drizzle
      <Rainy />,               // 10. freezing rain
      <Rainy />,               // 11. showers
      <Rainy />,               // 12. showers
      <Flurries />,            // 13. snow flurries
      <Flurries />,            // 14. light snow showers
      <Flurries />,            // 15. blowing snow
      <Flurries />,            // 16. snow
      <Rainy />,               // 17. hail
      <Rainy />,               // 18. sleet
      <Cloudy />,              // 19. dust
      <Cloudy />,              // 20. foggy
      <Cloudy />,              // 21. haze
      <Cloudy />,              // 22. smoky
      <Cloudy />,              // 23. blustery
      <Windy />,               // 24. windy
      <Windy />,               // 25. cold
      <Cloudy />,              // 26. cloudy
      <Cloudy />,              // 27. mostly cloudy (night)
      <Cloudy />,              // 28. mostly cloudy (day)
      <Cloudy />,              // 29. partly cloudy (night)
      <Cloudy />,              // 30. partly cloudy (day)
      <Sunny night={true} />,// 31. clear (night)
      <Sunny />,               // 32. sunny
      <Fair night={true} />, // 33. fair (night)
      <Fair />,                // 34. fair (day)
      <Rainy />,               // 35. mixed rain and hail
      <Sunny />,               // 36. hot
      <ThunderStorm />,        // 37. isolated thunderstorms
      <ThunderStorm />,        // 38. scattered thunderstorms
      <ThunderStorm />,        // 39. scattered thunderstorms
      <Rainy />,               // 40. scattered showers
      <Flurries />,            // 41. heavy snow
      <Flurries />,            // 42. scattered snow showers
      <Flurries />,            // 43. heavy snow
      <Cloudy />,              // 44. partly cloudy
      <ThunderStorm />,        // 45. thundershowers
      <Flurries />,            // 46. snow showers
      <ThunderStorm />         // 47. isolated thundershowers
    ];

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

    const forecastNextDays = forecast.map((value, index) => {
      const currentDay = value.day.toUpperCase();
      if (index > 5) { return null }
      return (
        <li key={index} ref={value}
          className={classNames('weather-day', { 'is-today': index === 0 })}>
          <span className="weather-weekday">{currentDay}</span>
          {mapping[value.code]}
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
                    <span className="weather-windSpeed">&#9873; {humidity} mph</span>
                    <span className="weather-humidity">&#9748; {windSpeed} g/m3</span>
                  </div>
                </div>
                :
                <div>
                  <span className="weather-date">{date}</span>
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