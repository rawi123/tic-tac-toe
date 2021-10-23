import React, { Component } from 'react'
import Square from './Square'

export default class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.ref=React.createRef()
        this.state = {
             turn:"x",
             history:[],
             array:Array(9).fill(null),
             winner:false
        }
    }

    checkWin=()=>{
        const waysToWin=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
         if(waysToWin.some(val=>{
			if (this.state.array[val[0]] === 'x' && this.state.array[val[1]] === 'x' && this.state.array[val[2]] === 'x') {
                return true;
			}
            else if(this.state.array[val[0]] === 'o' && this.state.array[val[1]] === 'o' && this.state.array[val[2]] === 'o'){
                return true;
            }
            return false;
        })){
            console.log(this.state.history[0].board,"in win");
            this.setState({winner:true})
        }
    }
    
    changeTurn=(indexOfSquare)=>{
        this.state.array[indexOfSquare]=this.state.turn;
        this.checkWin()
        this.state.history.push({board:[...this.state.array],turn:this.state.turn})
        this.setState({turn:this.state.turn==="x"?"o":"x",history:this.state.history,array:this.state.array})
    }

    render() {
        return (
            <div className="game-board">
                {}
                {[...Array(9).keys()].map(val=>{
                    return (<Square key={val} number={val} turn={this.state.turn} changeStateCB={this.changeTurn}/>)
                })}
            </div>
        )
    }
}
