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
            console.log(pos)
        })
    }

    render() {

        // access entities
        // also possible to simplify in mapStateToPropss
        const { entities: { documents } } = this.props

        return (
            <div className="container">

                <WeatherWidget />

            </div>
        )
    }

}

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