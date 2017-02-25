import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ArticleList from 'components/article-list/article-list'

import * as UserActions from 'actions/user-actions'

class Home extends Component {

    static propTypes = {
    }

    render() {

        const articles = [
            {
                id: 1,
                name: 'foo',
                author: 'bat',
                image: 'https://assets.entrepreneur.com/content/16x9/822/1413823428-amazingly-free-stock-websites.jpg'
            },
            {
                id: 2,
                name: 'bar',
                author: 'bak',
                image: 'https://www.sitebuilderreport.com/assets/facebook-stock-up-08c6c9a855df26a3b13a34ac62bb75cc.jpg',
            },
            {
                id: 3,
                name: 'baz',
                author: 'bar',
                image: 'http://netdna.webdesignerdepot.com/uploads/2008/12/stock-microstock.jpg'
            },
            {
                id: 1,
                name: 'foo',
                author: 'bat',
                image: 'https://assets.entrepreneur.com/content/16x9/822/1413823428-amazingly-free-stock-websites.jpg'
            },
            {
                id: 2,
                name: 'bar',
                author: 'bak',
                image: 'https://www.sitebuilderreport.com/assets/facebook-stock-up-08c6c9a855df26a3b13a34ac62bb75cc.jpg',
            },
            {
                id: 3,
                name: 'baz',
                author: 'bar',
                image: 'http://netdna.webdesignerdepot.com/uploads/2008/12/stock-microstock.jpg'
            },
            {
                id: 1,
                name: 'foo',
                author: 'bat',
                image: 'https://assets.entrepreneur.com/content/16x9/822/1413823428-amazingly-free-stock-websites.jpg'
            },
            {
                id: 2,
                name: 'bar',
                author: 'bak',
                image: 'https://www.sitebuilderreport.com/assets/facebook-stock-up-08c6c9a855df26a3b13a34ac62bb75cc.jpg',
            },
            {
                id: 3,
                name: 'baz',
                author: 'bar',
                image: 'http://netdna.webdesignerdepot.com/uploads/2008/12/stock-microstock.jpg'
            }
        ]

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

                <ArticleList
                    data={articles}
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
        UserActions,
        dispatch
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)