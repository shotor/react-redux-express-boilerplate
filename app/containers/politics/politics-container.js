import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class PoliticsContainer extends Component {

    static propTypes = {
    }

    render() {

        return (
            <div>

                Politics

            </div>
        )
    }

}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {},
        dispatch
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PoliticsContainer)