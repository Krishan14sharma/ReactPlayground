import React from "react";
import board from "mine-sweeper-kt"
import {FaBomb, FaFontAwesomeFlag} from "react-icons/fa"

// todo apply common class to all cell elements, contextmenu etc

export type IProp = {
    id: number
    state: CellState
    onCellClick(e: React.MouseEvent<HTMLDivElement>, id: number): void
    onCellContextClick(e: React.MouseEvent<HTMLDivElement>, id: number): void
}

interface Value {

}

interface CellState {
    value: Value
    correct?: boolean

    getDisplayState(): Value
}

class Cell extends React.Component<IProp, CellState> {

    render() {
        let view
        let cellState = this.props.state
        let id = this.props.id
        if (cellState instanceof board.core.Cell.State.Close) {
            view = <CloseCell onCellClick={this.props.onCellClick}
                              onCellContextClick={this.props.onCellContextClick}
                              id={id} state={this.props.state}/>
        } else if (cellState instanceof board.core.Cell.State.Open) {
            view = <ValueCell onCellClick={this.props.onCellClick}
                              onCellContextClick={this.props.onCellContextClick}
                              id={id} state={this.props.state}/>
        } else {
            view = <FlagCell onCellClick={this.props.onCellClick}
                             onCellContextClick={this.props.onCellContextClick}
                             id={id} state={this.props.state}/>
        }
        return view
    }
}

function stopContextClick(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault()
}

const CloseCell = (prop: IProp) => {
    return <div style={cellStyle} onClick={e => prop.onCellClick(e, prop.id)}
                onContextMenu={e => prop.onCellContextClick(e, prop.id)}/>
}
const FlagCell = (prop: IProp) => {
    return <div style={openCellStyle} onContextMenu={e => prop.onCellContextClick(e, prop.id)}>
        <FaFontAwesomeFlag/>
    </div>
}

const ValueCell = (prop: IProp) => {
    if (prop.state.getDisplayState() !== "-1") {
        return <div className="Cell" style={openCellStyle}
                    onContextMenu={event => stopContextClick(event)}>{prop.state.getDisplayState()}</div>
    } else return <div className="Cell" style={openCellStyle} onContextMenu={event => stopContextClick(event)}><FaBomb/>
    </div>
}

export default Cell;


const cellStyle = {
    display: "flex",
    backgroundColor: "#78909c",
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

const openCellStyle = {
    display: "flex",
    backgroundColor: "#37474f",
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