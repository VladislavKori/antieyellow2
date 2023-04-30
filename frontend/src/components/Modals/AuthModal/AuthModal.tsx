import React, { useState } from 'react'
import ModalContainer from '../Container/ModalContainer'

import './AuthModal.scss'

import SignUpForm from './SignUpForm/SignUpForm'
import SignInForm from './SignInForm/SignInForm'

interface AuthModalProps {
    isOpen: boolean
}

function AuthModal({hiddenModal}: any) {

    const [regFormIsOpen, setRegFormIsOpen] = useState<boolean>(false);

    return (
        <div className="authmodal">
            <h1 className="authmodal__title">Добро пожаловать</h1>
            {regFormIsOpen ? (
                <>
                    <SignUpForm />
                    <button
                        onClick={() => setRegFormIsOpen(false)}
                        className="authmodal__under"
                    >
                        Войти
                    </button>
                </>
            ) : (
                <>
                    <SignInForm />
                    <button
                        onClick={() => setRegFormIsOpen(true)}
                        className="authmodal__under"
                    >
                        Зарегестрироваться
                    </button>
                </>
            )}
        </div>
    )
}

export default AuthModal