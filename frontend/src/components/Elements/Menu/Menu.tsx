import React, { Children } from 'react'
import { NavLink } from 'react-router-dom'

interface IMenu {
    children?: JSX.Element
}

function Menu({children}: IMenu) {
    return (
        <nav className="header__navbar">
            <NavLink
                className={({ isActive, isPending }) =>
                    isActive ? "header__link header__link_active" : "header__link"
                }
                to={"/"}
            >
                Главная
            </NavLink>
            <NavLink
                className={({ isActive, isPending }) =>
                    isActive ? "header__link header__link_active" : "header__link"
                }
                to={"/blog"}
            >
                Новости
            </NavLink>
            <NavLink
                className={({ isActive, isPending }) =>
                    isActive ? "header__link header__link_active" : "header__link"
                }
                to={`/galary`}
            >
                Фотогалерея
            </NavLink>

            {children}
        </nav>
    )
}

export default Menu