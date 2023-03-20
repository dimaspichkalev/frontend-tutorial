import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppErrors } from '../../common/errors';
import { login } from '../../store/slice/auth';
import { instance } from '../../utils/axios';
import { useAppDispatch } from '../../utils/hook';
import LoginPage from './login';
import RegisterPage from './register';
import './style.scss';

const AuthRootComponent: React.FC = (): JSX.Element => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [email, setEmail] = useState('')
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e: {preventDefault: () => void;}) => {
        e.preventDefault()
        if (location.pathname === '/login') {
            try {
                const userData = {
                    username,
                    email,
                    password
                }
                const user = await instance.post('auth/sign-in', userData)
                // const user = await axios({
                //     method: 'post',
                //     url: 'http://localhost:8889/auth/sign-in',
                //     headers: {'Content-Type': 'application/x-www-form-urlencoded', 'accept': 'application/json'}, 
                //     data: {
                //         username, // This is the body part
                //         password
                //     }
                // });
                await dispatch(login(user.data))
                navigate('/')
            } catch(e) {
                return e
            }
        } else {
            if (password === repeatPassword) {
                const userData = {
                    username,
                    email,
                    password
                }
                const newUser = await instance.post('auth/sign-up', userData)
                await dispatch(login(newUser.data))
                navigate('/')
            } else {
                throw new Error(AppErrors.PasswordDoNotMatch)
            }
        }
    }

    return (
        <div className='root'>
            <form className="form" onSubmit={handleSubmit}>
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                    maxWidth={640}
                    margin='auto'
                    padding={5}
                    borderRadius={5}
                    boxShadow={'5px 5px 10px #ccc'}
                >
                    {
                        location.pathname === '/login' 
                            ? <LoginPage setUsername={setUsername} setPassword={setPassword} navigate={navigate}/> 
                            : location.pathname === '/register' 
                            ? <RegisterPage 
                                setEmail={setEmail} 
                                setPassword={setPassword}
                                setRepeatPassword={setRepeatPassword}
                                setUsername={setUsername}
                                navigate={navigate}
                                /> : null}
                </Box>
            </form>
        </div>
    );
};

export default AuthRootComponent;