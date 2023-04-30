import React, { useEffect } from 'react'
import './Footer.scss'
import { ReactComponent as Logo } from '../../../assets/logo2.svg'
import { ReactComponent as VkIcon } from '../../../assets/socials/vk.svg'
import { ReactComponent as TgIcon } from '../../../assets/socials/tg.svg'
import Menu from '../Menu/Menu'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { getCommonSettings } from '../../../redux/actions/sitesetActions'

function Footer() {

    const commonset = useAppSelector(state => state.commonSettings)
    const dispatch = useAppDispatch()
    useEffect( () => {
        dispatch(getCommonSettings())
    }, [])

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__inner">
                    <div className="footer__contacts">
                        <Logo className="footer__logo" />
                        <div className="footer__textblock">
                            {/* <p className="footer__text">Почта: hello@gmail.com</p> */}
                        </div>
                        <div className="footer__socials">
                            {commonset.commonSettings ? (
                                <>
                                    {commonset.commonSettings.tglink != "" ? (
                                        <a href={commonset.commonSettings.tglink} target='_blanck'>
                                            <TgIcon />
                                        </a>
                                    ) : null}
                                    {commonset.commonSettings.vklink != "" ? (
                                        <a href={commonset.commonSettings.vklink} target='_blanck'>
                                            <VkIcon />
                                        </a>
                                    ) : null}
                                </>
                            ) : null}
                        </div>
                        <p className="footer__copyright">Copyright © 2023 AntiYellow</p>
                    </div>
                    <div className="footer__menu">
                        <Menu />
                        <Link to="/privacy" className="footer__link">политика конфиденциальности</Link>
                    </div>
                </div>
                <div className="footer__mobile">
                    <Logo className="footer__logo" />
                    <div className="footer__menu">
                        <Menu />
                        <Link to="/privacy" className="footer__link">политика конфиденциальности</Link>
                    </div>
                    <div className="footer__textblock">
                        {/* <p className="footer__text">Почта: hello@gmail.com</p> */}
                    </div>
                    <div className="footer__socials">
                        {commonset.commonSettings ? (
                            <>
                                {commonset.commonSettings.tglink != "" ? (
                                    <a href={commonset.commonSettings.tglink} target='_blanck'>
                                        <TgIcon />
                                    </a>
                                ) : null}
                                {commonset.commonSettings.vklink != "" ? (
                                    <a href={commonset.commonSettings.vklink} target='_blanck'>
                                        <VkIcon />
                                    </a>
                                ) : null}
                            </>
                        ) : null}
                    </div>
                    <p className="footer__copyright">Copyright © 2023 AntiYellow</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer