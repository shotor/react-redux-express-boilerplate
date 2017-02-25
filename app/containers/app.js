import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import 'styles/app.less'

import * as UserActions from 'actions/user-actions'

class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    const props = this.props
    return(
      <div className="page-container">
        {React.cloneElement({...props}.children, {...props})}
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
)(App)