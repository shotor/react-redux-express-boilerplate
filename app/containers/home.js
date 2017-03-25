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

                <div className="card">
                    <div style={{
                        marginBottom: '10px'
                    }}>
                        <label>Title</label><br />
                        <input
                            type="text"
                            maxLength="30"
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

                <div className="card" style={{ textAlign: 'center' }}>
                    <pre style={{
                        'whiteSpace': 'pre-wrap',
                        textAlign: 'left'
                    }}>
                        <code>
                            {`<iframe width="330" height="372" src="http://localhost:3001/iframe/?t=${this.props.weather.title}&u=${this.props.weather.units}&w=${this.props.weather.showWind}></iframe>`}
                        </code>
                    </pre>

                    <button
                        className="btn"
                        onClick={() => this.props.saveWidget()}
                    >
                        Save
                    </button>

                </div>

                {this.props.weather.saved.length > 0 &&
                    <div style={{
                        margin: '0 auto',
                        textAlign: 'center',
                        color: '#fff'
                    }}>
                        <h2>Saved</h2>
                    </div>
                }

                {this.props.weather.saved.map(widget =>
                    <div
                        className="card"
                        key={`saved-${widget.id}`}
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
                                {`<iframe width="330" height="372" src="http://localhost:3001/iframe/?t=${widget.title}&u=${widget.units}&w=${widget.showWind}></iframe>`}
                            </code>
                        </pre>

                        <button
                            className="btn"
                            onClick={() => this.props.deleteWidget(widget.id)}
                        >
                            Delete
                        </button>

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