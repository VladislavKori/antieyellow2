import React from 'react'

import './Input.scss'

interface InputProps {
    lable?: string
    type: string
    placeholder: string
    value: any
    setValue: any,
    className?: string
    textarea?: boolean
}

function Input({ lable, type, placeholder, value, setValue, className, textarea}: InputProps) {
    return (
        <div className={"input " + className}>
            {!lable ? null : (<h2 className="input__lable">{lable}</h2>)}
            {textarea ? (
                <textarea className="input__textarea" placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)}  />
            ) : (
                <input
                    className="input__body"
                    type={type}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={placeholder}
                />
            )}
        </div>
    )
}

export default Input