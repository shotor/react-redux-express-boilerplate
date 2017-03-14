import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

require('expose-loader?$!expose-loader?jQuery!jquery')
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'styles/app.less'

import NavBar from 'components/nav-bar/nav-bar'

import * as EntityActions from 'actions/entity-actions'

class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    const props = this.props
    return(
      <div className="page-container">
        <NavBar />
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
    EntityActions,
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)