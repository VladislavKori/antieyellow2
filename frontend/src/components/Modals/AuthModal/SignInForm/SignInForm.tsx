import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import Input from '../../../Ui/Input/Input';
import Button from '../../../Ui/Button/Button';
import { login } from '../../../../redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

function SignInForm() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {
        loading,
        error,
        userInfo,
        success
    } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (success) {
            localStorage.setItem('token', userInfo.accessToken);
        }
    }, [error, success, dispatch])

    const authHandler = () => {
     
        dispatch(login({
            email,
            password,
        }))

        setEmail('');
        setPassword('');
    }

    return (
        <>
            <Input
                lable='Почта'
                type={'text'}
                value={email}
                setValue={setEmail}
                placeholder='Введите вашу почту'
            />

            <Input
                lable='Пароль'
                type={'password'}
                value={password}
                setValue={setPassword}
                placeholder='Введите пароль'
            />

            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Link className="authmodal__link" to={'/'}>Забыл пароль</Link>
            </div>

            <Button
                onClick={authHandler}
            >
                Войти
            </Button>
        </>
    )
}

export default SignInForm