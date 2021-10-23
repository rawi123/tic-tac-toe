import React, { Component } from 'react';
import GameBoard from './gameBoard';
import './css/style.css';
import History from './history';

export default class Container extends Component {
    constructor(props) {
        super(props)
    
        this.state =this.getInitialState()

    }
    getInitialState(changingFlag=false){
        return {
            history: [ Array(9).fill(null) ], newArray: Array(9).fill(null), changing: changingFlag, turn: null ,historyOverWrite:null
        }
    }
    
	addToHistory = (newBoardTurnObj, newHistoryFlag) => {
        const newHis = newHistoryFlag?this.state.historyOverWrite:this.state.history;
        newHis.push(newBoardTurnObj);
        this.setState({ history: [...newHis],newArray:[...newBoardTurnObj.board] });
	};

	undoBoard = (board, turn, history) => {
        console.log(history,"history");
		this.setState({ changing: true, newArray: board, turn: turn ,historyOverWrite:history});
	};

	componentDidUpdate() {
		if (this.state.changing) this.setState({ changing: false, turn: null });
	}

	shouldComponentUpdate() {
		return !this.state.changing;
	}
    restart=()=>{
        this.setState(this.getInitialState(true))
        this.undoBoard(Array(9).fill(null),"x",[Array(9).fill(null)])
    }

	render() {
		return (
			<>
				<div className="container flex-center flex-column">
					<GameBoard
						turn={this.state.turn}
						array={this.state.newArray}
						addToHistory={this.addToHistory}
						change={this.state.changing}
                        restart={this.restart}
					/>
				</div>
				<History history={this.state.history} undoBoard={this.undoBoard} />
			</>
		);
	}
}
