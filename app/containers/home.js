import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as EntityActions from 'actions/entity-actions'

class Home extends Component {

    static propTypes = {
        refresh_entities: PropTypes.func.isRequired,
        entities: PropTypes.object.isRequired
    }

    componentDidMount() {
        const { refresh_entities } = this.props
        // use this to load page data
        //refresh_entities('documents')
    }

    render() {

        // access entities
        // also possible to simplify in mapStateToPropss
        const { entities: { documents }} = this. props

        return (
            <div>

                <div className="jumbotron">
                    <div className="container">
                        <h1>Hello, world!</h1>
                        <p>
                            <a className="btn btn-primary btn-lg" href="#" role="button">
                                Learn more
                        </a>
                        </p>
                    </div>
                </div>

            </div>
        )
    }

}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        EntityActions,
        dispatch
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)