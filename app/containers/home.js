import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import WeatherWidget from 'containers/weather-widget/weather-widget'

import * as WeatherActions from 'actions/weather-widget-actions'

class Home extends Component {

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

        const { lat, lng } = this.props.weather

        if (!lat && !lng) {
            return (
                <div>
                    loading...
                </div>
            )
        }

        return (
            <div className="container">

                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <WeatherWidget
                            lat={lat}
                            lng={lng}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="card">
                            <div style={{
                                marginBottom: '10px'
                            }}>
                                <label>Title</label><br />
                                <input
                                    type="text"
                                    className="form-control"
                                    maxLength="37"
                                    style={{ width: '100%' }}
                                    value={this.props.weather.title}
                                    onChange={(e) => {
                                        const value = e.target.value || '\u00a0'
                                        this.props.updateTitle(value)
                                    }}
                                />
                            </div>
                            <div style={{
                                width: '50%',
                                textAlign: 'center',
                                display: 'inline-block'
                            }}>
                                <label>Units</label><br />
                                <button
                                    className="btn"
                                    onClick={() => this.props.toggleUnits()}
                                >
                                    {
                                        this.props.weather.units === 'F'
                                            ? 'Imperial'
                                            : 'Metric'
                                    }
                                </button>
                            </div>
                            <div style={{
                                width: '50%',
                                textAlign: 'center',
                                display: 'inline-block'
                            }}>
                                <label>Show wind</label><br />
                                <button
                                    className="btn"
                                    onClick={() => this.props.toggleWind()}
                                >
                                    {
                                        this.props.weather.showWind
                                            ? 'Visible'
                                            : 'Hidden'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="card" style={{ textAlign: 'center' }}>
                            <pre style={{
                                'whiteSpace': 'pre-wrap',
                                textAlign: 'left'
                            }}>
                                <code>
                                    {`<iframe height="130" width="470" src="http://localhost:3001/iframe/?t=${this.props.weather.title}&lat=${lat}&lng=${lng}&u=${this.props.weather.units}&w=${this.props.weather.showWind}></iframe>`}
                                </code>
                            </pre>

                            <button
                                className="btn"
                                onClick={() => this.props.saveWidget()}
                            >
                                Save
                            </button>

                        </div>
                    </div>
                </div>

                {this.props.weather.saved.length > 0 &&
                    <div style={{
                        margin: '0 auto',
                        textAlign: 'center',
                    }}>
                        <h2>Saved</h2>
                    </div>
                }

                <div className="row">

                </div>
                {this.props.weather.saved.map(widget =>
                    <div className="col-md-4 col-md-offset-4" key={`saved-${widget.id}`}>
                        <div
                            className="card"
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            <h3 className="color-primary">{widget.title}</h3>
                            <pre style={{
                                'whiteSpace': 'pre-wrap',
                                textAlign: 'left'
                            }}>
                                <code>
                                    {`<iframe height="130" width="470" src="http://localhost:3001/iframe/?t=${this.props.weather.title}&lat=${lat}&lng=${lng}&u=${this.props.weather.units}&w=${this.props.weather.showWind}></iframe>`}
                                </code>
                            </pre>

                            <button
                                className="btn"
                                onClick={() => this.props.deleteWidget(widget.id)}
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                )}

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
)(Home)