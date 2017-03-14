import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import RichTextEditor from 'react-rte'

import * as EntityActions from 'actions/entity-actions'

class Home extends Component {

    static propTypes = {
        refresh_entities: PropTypes.func.isRequired,
        entities: PropTypes.object.isRequired
    }

    constructor() {
        super()
        this.state = {
            editor_value: RichTextEditor.createEmptyValue()
        }
    }

    componentDidMount() {
        const { refresh_entities } = this.props
        // use this to load page data
        //refresh_entities('documents')
    }

    onChangeEditor(editor_value) {
        this.setState({editor_value});
    }

    render() {

        // access entities
        // also possible to simplify in mapStateToPropss
        const { entities: { documents } } = this.props

        return (
            <div id="container-home">

                <RichTextEditor
                    value={this.state.editor_value}
                    onChange={(new_value) => this.onChangeEditor(new_value)}
                />

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