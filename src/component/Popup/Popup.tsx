import React, {useEffect, useState} from "react";
import Popup from 'reactjs-popup';
import "./Popup.css"

interface IProps {
    open: boolean
    closeModal: Function
}

const YouLose = ({open, closeModal}: IProps) => {
    console.log(`open = ${open}`)
    return (<Popup className="modal" open={open} modal position={"right top"}>
        <div className="header">You Lose!</div>
        <div className="content">That was a wrong move. You lose this game. <br/>Let's play a new game</div>
        <div className="container">
            <button className="actions" onClick={(event) => {
                event.preventDefault()
                window.location.reload()
                closeModal()
            }
            }>Restart
            </button>
            <button className="actions" onClick={e => closeModal()}>Close
            </button>
        </div>
    </Popup>);
}

export {YouLose}