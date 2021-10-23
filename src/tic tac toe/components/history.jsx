import React, { Component } from 'react';

export default class History extends Component {

	render() {
		return (
			<div>
				<div className="history">
					<div className="move flex-center" onClick={() => {this.props.undoBoard(this.props.history[0],"x",[Array(9).fill(null)]);}}>Start</div>
					{this.props.history.slice(1).map((val, i) => {

						return (<div key={i} className="move flex-center" onClick={() => {this.props.undoBoard(val.board,val.turn==="x"?"o":"x",this.props.history.slice(0,i+2));}}>
								move {i + 1}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
