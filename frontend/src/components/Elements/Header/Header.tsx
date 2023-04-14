
// libs
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

// styles
import './Header.scss'

// hooks
import { useAppSelector } from '../../../hooks/redux'

// icons
import { ReactComponent as Logo } from '../../../assets/logo.svg';

// components
import AuthModal from '../../Modals/AuthModal/AuthModal';
import ModalContainer from '../../Modals/Container/ModalContainer';
import Menu from '../Menu/Menu'

function Header() {

    const { userInfo, isAuth } = useAppSelector((state) => state.user);
    const [authModalIsOpen, setAuthModalIsOpen] = useState<boolean>(false);

    return (
        <>
            <header className="header">
                <Link to="/">
                    <Logo className="header__logo" />
                </Link>

                <Menu>
                    {isAuth ? (
                        <Link to={`/user/${userInfo.id}`}>
                            <div className="header__userprofile">
                                <img src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=" />
                            </div>
                        </Link>
                    ) : (
                        <button
                            onClick={() => setAuthModalIsOpen(!authModalIsOpen)}
                            className="header__auth-btn">
                            Войти
                        </button>
                    )}
                </Menu>
            </header>

            {authModalIsOpen ? (
                <ModalContainer setVisible={setAuthModalIsOpen} currentState={authModalIsOpen}>
                    <AuthModal />
                </ModalContainer>
            ) : null}
        </>
    )
}

export default Header