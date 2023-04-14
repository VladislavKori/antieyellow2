import React, { useState } from 'react'
import { themesfake } from './fake'
import './Themes.scss'
import ThemeModel from './ThemeModel/ThemeModel'

interface IthemeItem {
    id: number
    title: string
    text: string
}

function Themes() {

    const [currentTheme, setTheme] = useState<number>(0);

    return (
        <div className="themes">
            <div className="themes__model">
                <ThemeModel />
            </div>
            <div className="themes__contet">
                <h1 className="themes__title">Ознакомьтесь с темами</h1>
                <header className="themes__theme-header">
                    {themesfake.map((item: IthemeItem) => (
                        <React.Fragment key={item.id}>
                            <button
                                onClick={() => setTheme(item.id)}
                                className={item.id === currentTheme ?
                                    "themes__theme-btn themes__theme-btn_active" :
                                    "themes__theme-btn"
                                }
                            >
                                {item.title}
                            </button>
                        </React.Fragment>
                    ))}
                </header>
                <div className="themes__theme-body">
                    <p className="themes__theme-text">
                    {themesfake[currentTheme].text}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Themes