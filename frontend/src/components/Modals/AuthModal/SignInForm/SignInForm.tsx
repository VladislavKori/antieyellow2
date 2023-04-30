import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import  '../AuthModal.scss'

import Input from '../../../Ui/Input/Input';
import Button from '../../../Ui/Button/Button';
import { login } from '../../../../redux/actions/authActions';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { clearError } from '../../../../redux/slices/authSlice';
import VkAuthBtn from '../VkAuthBtn/VkAuthBtn';

function SignInForm({ hiddenPage }: any) {

    // Валидационная строка для проверки на корректность поля email
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    // Состояние поля Email
    const [email, setEmail] = useState<string>('');
    const [emailErr, setEmailErr] = useState<string>('');

    // Состояние поля Password
    const [password, setPassword] = useState<string>('');
    const [passowordError, setPasswordError] = useState<string>('');

    // Загружаем данные о текущем пользователе
    const {
        loading,
        error,
        userInfo,
        success
    } = useAppSelector(state => state.auth)
    // Фун-ия для взаимодействия со стейтом redux
    const dispatch = useAppDispatch();

    // Обработка ошибок от ответа
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

    // Используем ещё один хук useEffect для валидации 
    // Подписываем его на валидируемые поля
    useEffect(() => {
        if (EMAIL_REGEXP.test(email)) setEmailErr('')
        if (password.length > 5 || password.length < 40) setPasswordError('')
    }, [email, password])

    // Ручка для отправки и валидации данных
    const authHandler = () => {

        if (!EMAIL_REGEXP.test(email)) return setEmailErr('Почта не верна')
        if (password.length < 5 || password.length > 40) return setPasswordError('Пароль не корректен')

        dispatch(login({
            email,
            password,
        }))

        // Сбрасываем поля
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
            {emailErr ? <p className="validation-error">{emailErr}</p> : null}

            <Input
                lable='Пароль'
                type={'password'}
                value={password}
                setValue={setPassword}
                placeholder='Введите пароль'
            />
            {passowordError ? <p className="validation-error">{passowordError}</p> : null}

            <Button
                onClick={authHandler}
            >
                Войти
            </Button>

            {/* <VkAuthBtn /> */}
        </>
    )
}

export default SignInForm