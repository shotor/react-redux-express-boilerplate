import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import 'styles/app.less'

import * as UserActions from 'actions/user-actions'

class App extends Component {

  static propTypes = {

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        {this.props.children}
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
)(App);
