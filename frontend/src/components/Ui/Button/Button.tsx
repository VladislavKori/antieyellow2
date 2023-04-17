import React from 'react'

import './Button.scss'

interface ButtonProps {
    children: JSX.Element | string
    onClick?: () => void
    className?: string
}

function Button({children, onClick, className}: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={"button " + className}
    >
      {children}
    </button>
  )
}

export default Button