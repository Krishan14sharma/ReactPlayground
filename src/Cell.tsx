import React from "react";
import board from "mine-sweeper-kt"
import {FaBomb, FaFontAwesomeFlag} from "react-icons/fa"

export type IProp = {
    id: number
    state: CellState
    onCellClick(e: React.MouseEvent<HTMLDivElement>, id: number): void
    onCellContextClick(e: React.MouseEvent<HTMLDivElement>, id: number): void
}

interface Value {

}

export interface CellState {
    value: Value;
    correct?: boolean;
    getDisplayState(): Value;
}


export function CellUi(props: IProp) {
    return render(props)
}

function stopContextClick(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault()
}

function render(props: IProp): JSX.Element {
    let view
    const click = (e: React.MouseEvent<HTMLDivElement>) => props.onCellClick(e, props.id)
    const contextClick = (e: React.MouseEvent<HTMLDivElement>) => props.onCellContextClick(e, props.id)

    if (props.state instanceof board.core.Cell.State.Close) {
        view = <div style={cellStyle} onClick={click} onContextMenu={contextClick}/>
    } else if (props.state instanceof board.core.Cell.State.Open) {
        if (props.state.getDisplayState() !== "-1") {
            view = <div className="Cell" style={openCellStyle}
                        onContextMenu={event => stopContextClick(event)}>{props.state.getDisplayState()}</div>
        } else view =
            <div className="Cell" style={openCellStyle} onContextMenu={stopContextClick}><FaBomb/></div>
    } else {
        view = <div style={openCellStyle} onContextMenu={contextClick}><FaFontAwesomeFlag/></div>
    }
    return view
}

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