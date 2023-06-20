import React from 'react'
import './Die.css'

const Die = (props) => {


    return (
        <React.Fragment>
            {<div className={props.isHeld ? "is-held" : "die-div"} onClick={props.holdDice}>
                {props.value}
            </div>}
        </React.Fragment>
    )
}

export default Die