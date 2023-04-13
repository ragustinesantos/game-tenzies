import React from "react";
import '../src/index.css'

export default function Die(props) {

    const changeColor = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div style={changeColor} className="die-face" onClick={() => props.hold(props.id)}>
            <div className="die-number">
                {props.value}
            </div>
        </div>
    )
}