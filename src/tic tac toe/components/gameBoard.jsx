import React, { Component } from 'react';
import Square from './Square';
import EndGame from './EndGame';

export default class GameBoard extends Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
		this.state = this.getInitialState()
	}

	getInitialState(){
		return {
			turn: 'x',
			array: [ ...Array(9).fill(null) ],
			winner: false,
			moveAfterChange: false
		};
	}

	checkWin = () => {;
		const waysToWin = [
			[ 0, 1, 2 ],
			[ 3, 4, 5 ],
			[ 6, 7, 8 ],
			[ 0, 3, 6 ],
			[ 1, 4, 7 ],
			[ 2, 5, 8 ],
			[ 0, 4, 8 ],
			[ 2, 4, 6 ]
		];
		if (
			waysToWin.some((val) => {
				if (
					this.state.array[val[0]] === 'x' &&
					this.state.array[val[1]] === 'x' &&
					this.state.array[val[2]] === 'x'
				) {
					return true;
				} else if (
					this.state.array[val[0]] === 'o' &&
					this.state.array[val[1]] === 'o' &&
					this.state.array[val[2]] === 'o'
				) {
					return true;
				}

				return false;
			})
		) {
			this.setState({ winner: this.state.turn });
			return true;
		} else if (!this.state.array.includes(null)) {
			this.setState({ winner: 'draw' });
			return true;
		}
	};

	changeTurn() {
		this.setState({
			turn: this.state.turn === 'x' ? 'o' : 'x',
			array: this.state.array
		});
	}


	playTurn = (indexOfSquare, changeHistoryFlag = false) => {
		const tempBoard=this.state.array
		tempBoard[indexOfSquare]= this.state.turn;
		this.props.addToHistory({ board: [ ...tempBoard ], turn: this.state.turn },changeHistoryFlag);
		if (!this.checkWin()) {
			this.changeTurn();
		}
	};
	componentDidUpdate = () => {
		let flag1,flag2;
		if(this.state.array!==this.props.array){
			this.setState({array:this.props.array})
		}
		if(this.props.change&&!this.state.moveAfterChange){
			flag1=true
		}
		if (this.props.turn && this.state.turn !== this.props.turn) {
			flag2=true
		}
		if(flag1&&flag2){
			this.setState({moveAfterChange:true,turn: this.props.turn});
		}
		else if(flag1)this.setState({moveAfterChange:true});
		else if (flag2)this.setState({turn: this.props.turn});

	};

	restart=()=>{
		this.props.restart()
		this.setState({winner:false})
	}

	render() {
		return (
			<>
				<EndGame restart={this.restart} winner={this.state.winner} turn={this.state.turn} />
				<div className="game-board">
					{[ ...Array(9).keys() ].map((val) => {
						return (
							<Square
								key={val}
								number={val}
								moveAfterChange={this.state.moveAfterChange}
								turn={this.state.turn}
								changeStateCB={this.playTurn}
								changed={this.props.change ? this.props.array[val] : false}
							/>
						);
					})}
				</div>
			</>
		);
	}
}
