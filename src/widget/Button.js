import React from "react";
import "../App.css"

export const PrimaryButton = ({msg, onClick}) => {
    return <div className="PrimaryButton" onClick={onClick}>{msg}</div>
}