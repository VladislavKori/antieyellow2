import React from 'react'
import './Footer.scss'
import { ReactComponent as Logo } from '../../../assets/logo2.svg'
import { ReactComponent as VkIcon } from '../../../assets/socials/vk.svg'
import { ReactComponent as TgIcon } from '../../../assets/socials/tg.svg'
import Menu from '../Menu/Menu'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__inner">
                    <div className="footer__contacts">
                        <Logo className="footer__logo" />
                        <div className="footer__textblock">
                            <p className="footer__text">Почта: hello@gmail.com</p>
                            <p className="footer__text">Телефон: +79999999999</p>
                        </div>
                        <div className="footer__socials">
                            <a href="/">
                                <TgIcon />
                            </a>
                            <a href="/">
                                <VkIcon />
                            </a>
                        </div>
                        <p className="footer__copyright">Copyright © 2023 AntiYellow</p>
                    </div>
                    <div className="footer__menu">
                        <Menu />
                        <Link to="/" className="footer__link">политика конфиденциальности</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer