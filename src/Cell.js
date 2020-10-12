import React from "react";
import {StateConstant} from "./MineSweeper";

// todo apply common class to all cell elements, contextmenu etc

class Cell extends React.Component {

    render() {
        let view
        let cellState = this.props.state.state
        let value = this.props.state.value
        if (cellState === StateConstant.close) {
            view = <EmptyCell onClick={this.props.onCellClick} id={1}/>
        } else if (cellState === StateConstant.open) {
            view = <ValueCell value={value}/>
        } else {
            view = <FlagCell/>
        }
        return view
    }
}

function handleEmptyCellContextClick(e) {
    e.preventDefault()
}

function stopContextClick(event) {
    event.preventDefault()
}

const EmptyCell = ({onClick, id}) => {
    return <div style={cellStyle} onClick={e => onClick(e, id)}
                onContextMenu={e => handleEmptyCellContextClick(e)}/>
}
const FlagCell = () => {
    return <div style={cellStyle} onContextMenu={event => stopContextClick(event)}>#</div>
}

const ValueCell = ({value}) => {
    if (value !== "-1") {
        return <div style={cellStyle} onContextMenu={event => stopContextClick(event)}>{value}</div>
    } else return <div style={cellStyle} onContextMenu={event => stopContextClick(event)}>!</div>
}

export default Cell;


const cellStyle = {
    display: "flex",
    backgroundColor: "#455A64",
    padding: "10px",
    fontFamily: "Arial",
    width: "10px",
    height: "10px",
    outline: "1px solid #CFD8DC",
    color: "#CFD8DC",
    borderStyle: "outset",
    justifyContent: "center",
    alignItems: "center"
}