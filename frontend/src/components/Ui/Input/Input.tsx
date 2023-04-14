import React from 'react'

import './Input.scss'

interface InputProps {
    lable?: string
    type: string
    placeholder: string
    value: any
    setValue: any
}

function Input({ lable, type, placeholder, value, setValue }: InputProps) {
    return (
        <div className="input">
            {!lable ? null : (<h2 className="input__lable">{lable}</h2>)}
            <input
                className="input__body"
                type={type}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input