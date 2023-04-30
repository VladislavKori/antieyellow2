import React, { Dispatch, useState, SetStateAction, useEffect } from 'react'
import Input from '../../Ui/Input/Input'
import Button from '../../Ui/Button/Button'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { changePassword, changeSocials } from '../../../redux/actions/settingsActions'
import { logout } from '../../../redux/actions/authActions'
import './Settings.scss'

// icons
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg'

interface SettingsProps {
    setPage: Dispatch<SetStateAction<boolean>>
}

function Settings({ setPage }: SettingsProps) {

    const dispatch = useAppDispatch()
    const settings = useAppSelector(state => state.settings)
    const auth = useAppSelector(state => state.auth.userInfo)

    // error state
    const [changePasError, setChangePasError] = useState<boolean>(false);
    const [changePasSuccess, setChangePasSuccess] = useState<boolean>(false);

    const [currentPassword, setCurentPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [repeatNewPassword, setRepeatNewPassword] = useState<string>("")

    const [vklink, setVklink] = useState<string>(auth.vklink);
    const [tglink, setTglink] = useState<string>(auth.tglink);

    useEffect(() => {
        if (settings.error) {
            setChangePasError(true)
            setTimeout(() => {
                setChangePasError(false)
            }, 2000)
        }
        if (settings.success) {
            setChangePasSuccess(true)
            setTimeout(() => {
                setChangePasSuccess(false)
            }, 2000)
        }
    }, [settings.error, settings.success])

    // Ручка для изменеия пароля
    const handleChangePassword = () => {

        dispatch(changePassword({
            currentPassword,
            newPassword
        }))

        setCurentPassword("")
        setNewPassword("")
        setRepeatNewPassword("")
    }

    // Ручка для выхода из аккаунта
    const logoutHandler = () => {
        dispatch(logout())
        if (typeof window !== 'undefined') {
            window.location.href = "/";
        }
    }

    // Сохранение настроек чата
    const saveChangesHandler = () => {
        dispatch(changeSocials({
            vklink,
            tglink
        }))
    }

    return (
        <div className="settings">
            <header className="settings__header">
                <button
                    className="settings__goback"
                    onClick={() => setPage(false)}
                >
                    <Arrow />
                </button>
                <h1 className="settings__title">Настройки</h1>
            </header>

            <Input
                lable='Изменить пароль'
                placeholder='Введите старый пароль'
                value={currentPassword}
                setValue={setCurentPassword}
                type="password"
            />
            <Input
                placeholder='Введите новый пароль'
                value={newPassword}
                setValue={setNewPassword}
                type="password"
            />
            <Input
                placeholder='Повторите новый пароль'
                value={repeatNewPassword}
                setValue={setRepeatNewPassword}
                type="password"
            />

            {/* Вывод состояния */}
            {changePasError ? (
                <p style={{ color: 'red' }}>{settings.error}</p>
            ) : null}
            {changePasSuccess ? (
                <p style={{ color: 'green' }}>Пароль успешно изменён</p>
            ) : null}
            {/* Вывод состояния */}

            <Button
                onClick={handleChangePassword}
            >
                Изменить
            </Button>

            <Input
                lable="Ссылка на ВКонтакте"
                placeholder='https://example.com/'
                value={vklink}
                setValue={setVklink}
                type="text"
            />
            <Input
                lable="Ссылка на Telegram"
                placeholder='https://example.com/'
                value={tglink}
                setValue={setTglink}
                type="text"
            />

            <div className="settings__btns">
                <Button
                    onClick={saveChangesHandler}
                >
                    Сохранить изменения
                </Button>
                <Button
                    className="settings__logout"
                    onClick={logoutHandler}
                >
                    Выйти из аккаунта
                </Button>
            </div>

        </div>
    )
}

export default Settings