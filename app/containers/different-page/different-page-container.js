import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as EntityActions from 'actions/entity-actions'

class DifferentPageContainer extends Component {

    static propTypes = {
    }

    render() {

        return (
            <div>

                Opinion

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
)(DifferentPageContainer)