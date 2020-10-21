import React from "react";
import "../App.css"

interface IParams {
    msg: string;
    onClick: () => void;
}

export const PrimaryButton = (btnObj: IParams) => {
    return <div className="PrimaryButton" onClick={btnObj.onClick}>{btnObj.msg}</div>
}