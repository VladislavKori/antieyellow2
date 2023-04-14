import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { register } from '../redux/Actions/userActions';

function LoginPage() {

  const { loading, userInfo, error } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect( () => {
    // console.log(userInfo, error)
  }, [userInfo, error])

  const authHandle = () => {    

    dispatch(register({username, email, password}))

    setEmail('')
    setUsername('')
    setPassword('')
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '200px'}}>
      {error ? (<p>Ошибка: {error}</p>) : null}
      <input
        type='text'
        placeholder='username'
        onChange={(e: any) => setUsername(e.target.value)}
        value={username}
      />
      <input
        type='email'
        placeholder='email'
        onChange={(e: any) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type='password'
        placeholder='password'
        onChange={(e: any) => setPassword(e.target.value)}
        value={password}
      />
      <button 
        onClick={() => authHandle()}
      >
        Заргестрироваться
      </button>
    </div>
  )
}

export default LoginPage