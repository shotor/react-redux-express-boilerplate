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

  render() {

    return (
      <div className="container-fluid" id="iframe-page">

        <div className="row">
          <div className="col-xs-12">
            <WeatherWidget
              updatePosition={this.props.updatePosition}
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