
// libs
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// redux
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout } from '../redux/actions/authActions';
import { Loader } from '@react-three/drei';
import { getUser } from '../redux/actions/userActions';

// styles
import '../styles/page/userpage.scss'

// components
import Settings from '../components/User/Settings/Settings';
import Button from '../components/Ui/Button/Button';

// icons 
import { ReactComponent as VKIcon } from '../assets/icons/vk.svg'
import { ReactComponent as TGIcon } from '../assets/icons/tg.svg'
import { ReactComponent as SettingsIcon } from '../assets/icons/settings.svg'

// configs
import globalConfig from '../configs/global.config';

function UserPage() {

    const { userId } = useParams();
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector(state => state.auth)
    const otherUser = useAppSelector(state => state.user)

    const [settingsIsOpen, setSettingsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (userId != undefined) {
            dispatch(getUser({ id: userId }))
        }
    }, [])

    if (otherUser.loading || currentUser.loading) {
        return (
            <h1 className="error-text">Загрузка</h1>
        )
    }

    if (!!otherUser.error || !otherUser.user) {
        return (
            <h1 className="error-text">{otherUser.error} "userpage"</h1>
        )
    }

    return (
        <div className="userpage">
            <div
                className="userpage__avatar"
                style={{
                    background: `url('${globalConfig.SERVER_HOST + "/" + otherUser.user.avatar}')`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            />
            {settingsIsOpen ? (
                <Settings setPage={setSettingsOpen} />
            ) : (
                <div className="userpage__info">
                    <h1 className="userpage__name">{otherUser.user.username}</h1>
                    <p className="userpage__data-create">
                        Дата регестрации: {otherUser.user.createdAt}
                    </p>
                    <div className="userpage__socials">
                        {otherUser.user.vklink ? (
                            <a href={otherUser.user.vklink}>
                                <VKIcon />
                            </a>) : null}

                        {otherUser.user.tglink ? (
                            <a href={otherUser.user.tglink}>
                                <TGIcon />
                            </a>) : null}
                    </div>

                    {!!currentUser.userInfo && currentUser.userInfo.id == otherUser.user.id ? (
                        <div className="userpage__btn-bar">
                            <Button
                                className="userpage__settings-btn"
                                onClick={() => setSettingsOpen(true)}
                            >
                                <SettingsIcon className="userpage__icon" />
                            </Button>

                            {currentUser.isAdmin ? (
                                <Link
                                    className="userpage__link"
                                    to={'/admin/galary'}
                                >
                                    Админка
                                </Link>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    )
}

export default UserPage