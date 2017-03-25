import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import WeatherWidget from 'containers/weather-widget/weather-widget'

import * as WeatherActions from 'actions/weather-widget-actions'

class Iframe extends Component {

  static propTypes = {
    updateTitle: PropTypes.func.isRequired,
    weather: PropTypes.object.isRequired
  }

  componentDidMount() {
    const geo = navigator.geolocation
    const position = geo.getCurrentPosition(pos => {
      this.props.updatePosition(pos.coords.latitude, pos.coords.longitude)
    })
  }

  render() {

    const { lat: _lat, lng: _lng } = this.props.weather

    const latParam = getURLParam(window.location, 'lat');
    const lngParam = getURLParam(window.location, 'lng');

    const lat = latParam || lat
    const lng = lngParam || lng

    if (!lat && !lng) {
      return (
        <div>
          loading...
        </div>
      )
    }

    return (
      <div className="container-fluid">

        <div className="row">
          <div className="col-xs-12">
            <WeatherWidget
              lat={parseFloat(lat)}
              lng={parseFloat(lng)}
            />
          </div>
        </div>

      </div>
    )
  }

}

const getURLParam = (oTarget, sVar) => {
  return decodeURI(oTarget.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURI(sVar).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
};

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    WeatherActions,
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Iframe)