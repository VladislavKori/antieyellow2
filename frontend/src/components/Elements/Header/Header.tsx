
// libs
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

// styles
import './Header.scss'

// hooks
import { useAppSelector } from '../../../hooks/redux'

// icons
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { ReactComponent as BurgerMenu } from '../../../assets/icons/burgermenu.svg'
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import { ReactComponent as Logo2 } from '../../../assets/logo2.svg';
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg';

// components
import AuthModal from '../../Modals/AuthModal/AuthModal';
import ModalContainer from '../../Modals/Container/ModalContainer';
import Menu from '../Menu/Menu'
import globalConfig from '../../../configs/global.config';

function Header() {

    const location = useLocation(); // Хук для отслеживания url -а
    const navigate = useNavigate();

    const { userInfo, isAuth } = useAppSelector(state => state.auth);
    const [authModalIsOpen, setAuthModalIsOpen] = useState<boolean>(false);

    const [authScreenIsOpen, setScreenModalIsOpen] = useState<boolean>(false);
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

    // Скрываем мобильное меню, если ссылка сменилась
    useEffect(() => {
        setMenuIsOpen(false)
    }, [location])

    // Если открыта модалка, то блокируем экран для скрола
    useEffect(() => {
        if (menuIsOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [menuIsOpen])

    return (
        <>
            <header className="header">
                <Link to="/">
                    <Logo className="header__logo" />
                </Link>

                <button
                    onClick={() => setMenuIsOpen(true)}
                    className="header__burgermenu"
                >
                    <BurgerMenu />
                </button>

                {/* header mobile menu */}
                <div className={menuIsOpen ? "hmm hmm__open" : "hmm hmm__close"}>

                    {!authScreenIsOpen ? (
                        <>
                            <header>
                                <button className="header__burgermenu" onClick={() => setMenuIsOpen(false)}>
                                    <CloseIcon />
                                </button>
                            </header>
                            <div className="hmm__body">
                                <Logo className="header__logo hmm__logo" />
                                <Logo2 className="hmm__logo2" />
                                <Menu>
                                    {isAuth ? (
                                        <div className="hmm__btn" style={{ cursor: 'pointer' }} onClick={() => {
                                            navigate(`/user/${userInfo.id}`)
                                            window.location.reload();
                                        }}>
                                            <div
                                                className="header__userprofile"
                                                style={{
                                                    background: `url('${globalConfig.SERVER_HOST + "/" + userInfo.avatar}')`,
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: 'cover',
                                                }}
                                            />
                                            <p className="hmm__text">{userInfo.username}</p>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setScreenModalIsOpen(true)}
                                            className="header__auth-btn">
                                            Войти
                                        </button>
                                    )}
                                </Menu>
                            </div>
                        </>
                    ) : (
                        <>
                            <header>
                                <button className="header__burgermenu" onClick={() => setScreenModalIsOpen(false)}>
                                    <Arrow className="hmm__arrow" />
                                </button>
                            </header>
                            <div className="hmm__body">
                                <AuthModal />
                            </div>
                        </>
                    )}
                </div>

                <Menu>
                    {isAuth ? (
                        <div style={{ cursor: 'pointer' }} onClick={() => {
                            navigate(`/user/${userInfo.id}`)
                            window.location.reload();
                        }}>
                            <div
                                className="header__userprofile"
                                style={{
                                    background: `url('${globalConfig.SERVER_HOST + "/" + userInfo.avatar}')`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                }}
                            />
                        </div>
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
                    <AuthModal hiddenModal={setAuthModalIsOpen} />
                </ModalContainer>
            ) : null}
        </>
    )
}

export default Header