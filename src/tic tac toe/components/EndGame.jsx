import React, { Component } from 'react'

export default class EndGame extends Component {
    render() {
        return (
            <>
                	{this.props.winner ? (
					<div id="winner" className="flex-center flex-column">
						<h2>
							{this.props.winner!=="draw"?<><span className="winner-text">-{this.props.turn}</span> WON!</>:"DRAW!"}
                        </h2>
                        <input type="submit" value="RESTART" id="restart" onClick={()=>this.props.restart()}/>
					</div>
				): <div className="playing">playing: {this.props.turn}</div>}
            </>
        )
    }
}
