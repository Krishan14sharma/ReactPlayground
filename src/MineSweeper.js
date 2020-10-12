import React from "react";
import Cell from "./Cell";

class MineSweeper extends React.Component {

    constructor() {
        super();
        let cellState = new CellState()
        this.state = {
            cell: cellState
        }
    }

    onCellClick = (event, id) => {
        let newState = new CellState()
        newState.state = StateConstant.open
        newState.value = "5"
        this.setState({
                cell: newState
            }
        )
    }

    render() {
        console.log(this.state.cell)
        let openState = new CellState()
        openState.state = StateConstant.open
        openState.value = "3"
        let bombState = {...openState}
        bombState.value = "-1"
        let flagState = new CellState()
        flagState.state = StateConstant.flag
        return <div>
            <h1>MineSweeper Game</h1>
            <Cell state={this.state.cell} onCellClick={this.onCellClick}/>
            <Cell state={flagState} onCellClick={this.onCellClick}/>
            <Cell state={openState} onCellClick={this.onCellClick}/>
            <Cell state={bombState} onCellClick={this.onCellClick}/>
        </div>
    }


}


export default MineSweeper;

export const StateConstant = {
    close: "close",
    open: "open",
    flag: "flag"
}

export class CellState {
    value = "6";
    state = StateConstant.close
}
