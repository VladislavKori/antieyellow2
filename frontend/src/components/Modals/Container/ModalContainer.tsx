
// libs
import React from 'react'

// styles
import './ModalContainer.scss'

// icons
import { ReactComponent as Close } from '../../../assets/close.svg';

interface ModalContainerProps {
  children: JSX.Element
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  currentState: boolean
}

function ModalContainer({ children, setVisible, currentState }: ModalContainerProps) {

  const closeModal = () => {
    setVisible(!currentState)
  }

  return (
    <div className="modal">
      <div
        onClick={() => closeModal()}
        className="modal__blackout"
      ></div>
      <div className="modal__content">
        <header className="modal__header">
          <button
            onClick={() => closeModal()}
            className="modal__close-btn"
          >
            <Close className="modal__close-icon" />
          </button>
        </header>
        {children}
      </div>
    </div>
  )
}

export default ModalContainer