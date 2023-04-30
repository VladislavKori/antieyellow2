import React from 'react'

import './Button.scss'

import { ReactComponent as TrashIcon } from '../../../assets/icons/Trash.svg'
import { ReactComponent as ChangeIcon } from '../../../assets/icons/Change.svg'

interface ButtonProps {
  children: JSX.Element | string
  onClick?: () => void
  className?: string
  type?: 'default' | 'delete' | 'change'
}

function Button({ children, onClick, className = "", type = 'default' }: ButtonProps) {

  if (type == 'delete') {
    return (
      <button
        onClick={onClick}
        className={"button-delete " + className}
      >
        <TrashIcon />
      </button>
    )
  }

  if (type == 'change') {
    return (
      <button
        onClick={onClick}
        className={"button-change " + className}
      >
        <ChangeIcon />
      </button>
    )
  }

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