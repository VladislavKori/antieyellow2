import React, { useEffect, useState } from 'react'
import Input from '../../../Ui/Input/Input'
import Button from '../../../Ui/Button/Button';

import '../AuthModal.scss'

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { register } from '../../../../redux/actions/authActions';
import { clearError } from '../../../../redux/slices/authSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpForm() {

    const notify = (error: string) => console.log(toast(error));

    const [username, setUsername] = useState<string>('')
    const [usernameErr, setUsernameErr] = useState<string>('');

    const [email, setEmail] = useState<string>('');
    const [emailErr, setEmailErr] = useState<string>('');

    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('')

    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [reepatPasswordErr, setRepeatPasswordError] = useState<string>('');

    const {
        loading,
        error,
        userInfo,
        success
    } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    useEffect( () => {
        if (username.length > 2 || username.length < 10) setUsernameErr("")
        if (EMAIL_REGEXP.test(email)) setEmailErr('')
        if (password.length > 5 || password.length < 40) setPasswordError('')
        if (repeatPassword == password) return setRepeatPasswordError('')

    }, [username, email])

    const authHandler = () => {

        if (username.length <= 2 || username.length > 10) return setUsernameErr("Колличество символов не корректно")
        if (!EMAIL_REGEXP.test(email)) return setEmailErr('Почта не верна')
        if (password.length < 5 || password.length > 40) return setPasswordError('Пароль не корректен')
        if (repeatPassword != password) return setRepeatPasswordError('Пароли не совпадают')

        dispatch(register({
            username,
            email,
            password
        }))

        setUsername('');
        setEmail('');
        setPassword('');
        setRepeatPassword('');
    }

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearError())
        }
        if (success && !error) {
            localStorage.setItem('token', userInfo.accessToken);
            window.location.reload();
        }
    }, [error, success, dispatch])

    return (
        <>
            <Input
                lable='Имя'
                type={'text'}
                value={username}
                setValue={setUsername}
                placeholder='Введите ваше имя'
            />
            {usernameErr ? <p className="validation-error">{usernameErr}</p> : null}

            <Input
                lable='Почта'
                type={'email'}
                value={email}
                setValue={setEmail}
                placeholder='Введите вашу почту'
            />
            {emailErr ? <p className="validation-error">{emailErr}</p> : null}

            <Input
                lable='Пароль'
                type={'password'}
                value={password}
                setValue={setPassword}
                placeholder='Придумайте пароль'
            />
            {passwordError ? <p className="validation-error">{passwordError}</p> : null}

            <Input
                type={'password'}
                value={repeatPassword}
                setValue={setRepeatPassword}
                placeholder='Повторите пароль'
            />
            {reepatPasswordErr ? <p className="validation-error">reepatPasswordErr</p> : null}

            <Button
                onClick={authHandler}
            >
                Зарегестрироваться
            </Button>
        </>
    )
}

export default SignUpForm