import React from "react";
import msManager from "mine-sweeper-kt"
import {FaBomb, FaFontAwesomeFlag} from "react-icons/fa"

// todo apply common class to all cell elements, contextmenu etc

class Cell extends React.Component {

    render() {
        let view
        let cellState = this.props.state.state
        let value = this.props.state.state.getDisplayState()
        let id = this.props.state.id

        if (cellState instanceof msManager.core.Cell.State.Close) {
            view = <CloseCell onClick={this.props.onCellClick}
                              onCellContextClick={this.props.onCellContextClick}
                              id={id}/>
        } else if (cellState instanceof msManager.core.Cell.State.Open) {
            view = <ValueCell value={value} id={id}/>
        } else if (cellState instanceof msManager.core.Cell.State.Flag) {
            view = <FlagCell id={id} onCellContextClick={this.props.onCellContextClick}/>
        }
        return view
    }
}

function stopContextClick(event) {
    event.preventDefault()
}

const CloseCell = ({onClick, onCellContextClick, id}) => {
    return <div style={cellStyle} onClick={e => onClick(e, id)}
                onContextMenu={e => onCellContextClick(e, id)}/>
}
const FlagCell = ({id, onCellContextClick}) => {
    return <div style={openCellStyle} onContextMenu={e => onCellContextClick(e, id)}><FaFontAwesomeFlag/></div>
}

const ValueCell = ({value}) => {
    if (value !== "-1") {
        return <div className="Cell" style={openCellStyle}
                    onContextMenu={event => stopContextClick(event)}>{value}</div>
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