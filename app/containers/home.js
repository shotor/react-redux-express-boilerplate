import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import WeatherWidget from 'containers/weather-widget/weather-widget'

import * as WeatherActions from 'actions/weather-widget-actions'

class Home extends Component {

    static propTypes = {
        updateTitle: PropTypes.func.isRequired,
        toggleUnits: PropTypes.func.isRequired,
        toggleWind: PropTypes.func.isRequired,
        updatePosition: PropTypes.func.isRequired,
        weather: PropTypes.object.isRequired,
    }

    unitsChanged(e) {
        this.props.toggleUnits(e.currentTarget.value)
    }

    windChanged(e) {
        this.props.toggleWind(e.currentTarget.value === 'visible')
    }

    render() {

        let lat = this.props.weather.lat
        let lng = this.props.weather.lng

        const { units, showWind } = this.props.weather

        return (
            <div className="container" id="home-page">

                <div className="row">

                    <div className="col-md-4">
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
                            <div>
                                <label>Units</label><br />
                                <label className="radio-inline">
                                    <input 
                                        type="radio" 
                                        name="units" 
                                        value="F"
                                        checked={units === 'F'}
                                        onChange={this.unitsChanged.bind(this)} 
                                    />
                                    Imperial
                                </label>
                                <label className="radio-inline">
                                    <input 
                                        type="radio" 
                                        name="units" 
                                        value="C" 
                                        checked={units === 'C'}
                                        onChange={this.unitsChanged.bind(this)} 
                                    />
                                    Metric
                                </label>
                            </div>
                            <div>
                                <label>Show wind</label><br />
                                <label className="radio-inline">
                                    <input 
                                        type="radio" 
                                        name="wind" 
                                        checked={showWind === true}
                                        value="visible"
                                        onChange={this.windChanged.bind(this)} 
                                    />
                                    Visible
                                </label>
                                <label className="radio-inline">
                                    <input 
                                        type="radio" 
                                        name="wind" 
                                        checked={showWind === false}
                                        value="hidden"
                                        onChange={this.windChanged.bind(this)} 
                                    />
                                    Hidden
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <WeatherWidget
                            updatePosition={this.props.updatePosition}
                        />
                    </div>

                    <div className="col-md-4">
                        <div 
                            className="card" 
                            style={{ 
                                textAlign: 'center',
                                height: '190px'
                            }}
                        >
                            <pre style={{
                                'whiteSpace': 'pre-wrap',
                                textAlign: 'left'
                            }}>
                                <code>
                                    {`<iframe height="125" width="470" src="http://localhost:3001/iframe/?t=${this.props.weather.title}&lat=${lat}&lng=${lng}&u=${this.props.weather.units}&w=${this.props.weather.showWind}" frameborder="0"></iframe>`}
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
                                    {`<iframe height="125" width="470" src="http://localhost:3001/iframe/?t=${this.props.weather.title}&lat=${lat}&lng=${lng}&u=${this.props.weather.units}&w=${this.props.weather.showWind}" frameborder="0"></iframe>`}
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