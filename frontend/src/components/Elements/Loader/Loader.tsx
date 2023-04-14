import React from 'react'
import './Loader.scss'

function Loader() {
    return (
        <div className="laoder">
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    )
}

export default Loader