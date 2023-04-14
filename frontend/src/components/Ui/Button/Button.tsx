import React from 'react'

import './Button.scss'

interface ButtonProps {
    children: JSX.Element | string
    onClick?: () => void
}

function Button({children, onClick}: ButtonProps) {
  return (
    <button onClick={onClick} className="button">{children}</button>
  )
}

export default Button