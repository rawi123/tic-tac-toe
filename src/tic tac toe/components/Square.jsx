import React, { Component } from 'react'

export default class Square extends Component {
    constructor(props) {
        super(props)
        this.state = {
             takenSquare:""
            }
    }
    
    applyTurn=()=>{
        if(this.state.takenSquare===""){
            this.setState({takenSquare:this.props.turn})
            this.props.changeStateCB(this.props.number)
        }
    }

    render() {
        return (
            <div className="square" onClick={()=>{this.applyTurn()}}>
                <div className={this.state.takenSquare}></div>
            </div>
        )
    }
}
