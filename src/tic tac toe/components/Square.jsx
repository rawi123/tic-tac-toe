import React, { Component } from 'react';

export default class Square extends Component {
	constructor(props) {
		super(props);
		this.state = {
			takenSquare: null
		};
	}

	applyTurn = () => {
		if (this.state.takenSquare === null) {
			if (this.props.moveAfterChange) {
				this.props.changeStateCB(this.props.number, true);
			}
            else{
                this.props.changeStateCB(this.props.number);
            }
			this.setState({ takenSquare: this.props.turn });
		}
	};

	componentDidUpdate() {
		if (this.props.changed !== false && this.props.changed !== this.state.takenSquare) {
			this.setState({ takenSquare: this.props.changed });
		}
	}

	render() {
		return (
			<div
				className="square flex-center"
				onClick={() => {
					this.applyTurn();
				}}
			>
				<div className={this.state.takenSquare} />
			</div>
		);
	}
}
