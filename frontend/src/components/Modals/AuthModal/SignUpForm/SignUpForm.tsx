import React, { useEffect, useState } from 'react'
import Input from '../../../Ui/Input/Input'
import Button from '../../../Ui/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { register } from '../../../../redux/actions/userActions';

function SignUpForm() {

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');

    const {
        loading,
        error,
        userInfo,
        success
    } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (error) {
            alert(error);
        }

        if (success) {
            localStorage.setItem('token', userInfo.accessToken);
        }
    }, [error, success, dispatch])

    const authHandler = () => {

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

    return (
        <>
            <Input
                lable='Имя'
                type={'text'}
                value={username}
                setValue={setUsername}
                placeholder='Введите ваше имя'
            />

            <Input
                lable='Почта'
                type={'email'}
                value={email}
                setValue={setEmail}
                placeholder='Введите вашу почту'
            />

            <Input
                lable='Пароль'
                type={'password'}
                value={password}
                setValue={setPassword}
                placeholder='Придумайте пароль'
            />

            <Input
                type={'password'}
                value={repeatPassword}
                setValue={setRepeatPassword}
                placeholder='Повторите пароль'
            />

            <Button
                onClick={authHandler}
            >
                Зарегестрироваться
            </Button>
        </>
    )
}

export default SignUpForm