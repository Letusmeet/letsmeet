import React, { Component } from 'react'
import logo from './logo.png'
import './NavChat.css'
export default class NavChat extends Component {
    render() {
        return (
            <div className="nav">
                <div className="nav__blocks">
                    <img src={logo}></img>
                </div>
                <div className="nav__blocks"></div>
                <div className="nav__blocks"></div>
            </div>
        )
    }
}
