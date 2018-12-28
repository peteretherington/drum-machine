import React from 'react'

import './index.css'

const Display = (props) => {
    return (
        <div className="display">
            <div id="display" className="lastPad">{props.lastPad}</div>
            <div className="currentBank" onClick={props.switchBank}>{props.currentBank}</div>
        </div>
    )
}

export default Display
