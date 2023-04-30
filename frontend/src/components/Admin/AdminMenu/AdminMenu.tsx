import React from 'react'
import { NavLink } from 'react-router-dom'
import './AdminMenu.scss'

// icons
import { ReactComponent as GalaryIcon } from '../../../assets/admin/galary.svg'
import { ReactComponent as BlogIcon } from '../../../assets/admin/blog.svg'
import { ReactComponent as SettingsIcon } from '../../../assets/admin/settings.svg'
import { ReactComponent as HomeIcon } from '../../../assets/admin/home.svg'

function AdminMenu() {
    return (
        <div className="admin__sidebar">
            {/* section of Galary */}
            <NavLink
                to={"/admin/galary"}
                className={({ isActive, isPending }) =>
                    isActive ? "admin__link admin__link_active" : "admin__link"
                }
            >
                <GalaryIcon className="admin__icon" />
                <p className="admin__link-text">Галерея</p>
            </NavLink>

            {/* section of Blog */}
            <NavLink
                to={"/admin/blog"}
                className={({ isActive, isPending }) =>
                    isActive ? "admin__link admin__link_active" : "admin__link"
                }
            >
                <BlogIcon className="admin__icon" />
                <p className="admin__link-text">Блог</p>
            </NavLink>

            {/* section of CommonSettings */}
            <NavLink
                to={"/admin/common"}
                className={({ isActive, isPending }) =>
                    isActive ? "admin__link admin__link_active" : "admin__link"
                }
            >
                <SettingsIcon className="admin__icon" />
                <p className="admin__link-text">Общие настройки</p>
            </NavLink>
        </div>
    )
}

export default AdminMenu