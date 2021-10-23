import React, { Component } from 'react'
import GameBoard from './gameBoard'
import "./css/style.css"

export default class Container extends Component {
    render() {
        return (
            <div className="container">
                <GameBoard/>
            </div>
        )
    }
}
