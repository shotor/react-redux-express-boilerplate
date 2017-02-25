import React, { Component, PropTypes } from 'react'
import './footer.less'

export default class Footer extends Component {

    render() {
        return (
            <div>
                <div className="footer-contact">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <h2>The Influence</h2>
                                <p>
                                    32 West 39th Street #4<br></br>
                                    New York, NY 10018<br></br>
                                    About The Influence
                                </p>
                            </div>
                            <div className="col-md-3">
                                <h2>SUBSCRIBE TO DAILY TOP STORIES</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox"></input> Check me out
                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-default">Submit</button>
                                </form>
                            </div>
                            <div className="col-md-3">
                                <h2>SUBSCRIBE TO WEEKLY TOP STORIES</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox"></input> Check me out
                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-default">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 copyright-container">
                                <div className="copyright-text">
                                    Copyright© 2016 The Influence. All rights reserved.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}