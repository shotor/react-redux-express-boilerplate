import React, { Component, PropTypes } from 'react'
import './article-list.less'

export default class ArticleList extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.props.data.map((article, key) =>
                        <div
                            className="col-md-4 article-preview"
                            key={key}
                        >
                            <div className="article-text-container">
                                <div className="article-thumbnail-overlay">
                                </div>
                            </div>
                            <img
                                className="article-thumbnail"
                                src={article.image}
                            ></img>
                            <div className="article-text-container">
                                <a className="article-text">
                                    {article.name}
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

}
