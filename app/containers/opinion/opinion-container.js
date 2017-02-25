import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as UserActions from 'actions/user-actions'

class OpinionContainer extends Component {

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
        UserActions,
        dispatch
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OpinionContainer)