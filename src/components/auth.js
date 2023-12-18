import React, {useState, useEffect} from "react";
import {API} from '../api-service';
//import { TokenContext } from "../index";
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut, faLockOpen, faMailForward} from '@fortawesome/free-solid-svg-icons';

function Auth(){
    const [ username, setUsername] = useState('');
    const[ password, setPassword] = useState('');
    const[ password2, setPassword2] = useState('');

    const [email, setEmail ] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);
    const [token, setToken] = useCookies(['the-token']);

    useEffect(() => {
        //console.log(token);
        if(token['the-token']) window.location.href = '/places';
    }, [token])


    const loginClicked = () => {
        API.loginUser({username, password})
        .then(resp =>setToken('the-token', resp.token))
        .catch(error => console.log(error))
    }

    const registerClicked = () =>{
        API.registerUser({username, password})
        .then(() =>loginClicked())
        .catch(error => console.log(error))
    }

    const isDisabled = username.length === 0 || password.length === 0;

    const isPasswordCorrect = password === password2;

    return (
        <div className="App">
            {isLoginView ? <h1 className="App-header">Login</h1> : <h1 className="App-header">Register</h1> }
            <div className="login-container">
                {   isLoginView 
                    ?   
                    <div>
                        <label htmlFor='username'>Username</label><br/>
                        <FontAwesomeIcon className="credential-icons" icon={faUserAstronaut}></FontAwesomeIcon>
                        <input id="username" type="text" placeholder='username'
                        value={username} onChange={ eve => setUsername(eve.target.value)}></input><br/>
                        <label htmlFor='password'>Password</label><br/>
                        <FontAwesomeIcon className="credential-icons" icon={faLockOpen}></FontAwesomeIcon>
                        <input id="password" type="password" placeholder='password'
                        value={password} onChange={eve => setPassword(eve.target.value)}></input><br/> 
                        {/* .replace(password, '******')                                */}
                        <button onClick={loginClicked} disabled={isDisabled}>Login</button> 
                    </div>
                    :
                    <div>

                        <label htmlFor='username'>Username</label><br/>
                        <FontAwesomeIcon className="credential-icons lock" icon={faUserAstronaut}></FontAwesomeIcon>
                        <input id="username" type="text" placeholder='username'
                        value={username} onChange={ eve => setUsername(eve.target.value)}></input><br/>
                        
                        <div className="comfirmation" passworded={isPasswordCorrect}>
                            <label htmlFor='password'>Password</label><br/>
                            <FontAwesomeIcon className="credential-icons" icon={faLockOpen}></FontAwesomeIcon>
                            <input id="password" type="text" placeholder='Password'
                            value={password} onChange={eve => setPassword(eve.target.value)}></input><br/>

                            <label htmlFor='password2'>Retype Password</label><br/>
                            <FontAwesomeIcon className="credential-icons" icon={faLockOpen}></FontAwesomeIcon>
                            <input id="password" type="text" placeholder='Password'
                            value={password} onChange={eve => setPassword2(eve.target.value) } 
                            ></input><br/> 
                        </div>
                        <label htmlFor='email'>E-mail</label><br/>
                        <FontAwesomeIcon className="credential-icons" icon={faMailForward}></FontAwesomeIcon>
                        <input id="email" type="email" placeholder='E-mail'
                        value={email} onChange={eve => setEmail(eve.target.value)}></input><br/>
                         
                        <button onClick={registerClicked} disabled={isDisabled}>Register</button>
                    </div>
                }
                {isLoginView ?
                    <p onClick={() =>setIsLoginView(false)}>You dont have an account? Register here.</p> :
                    <p onClick={() => setIsLoginView(true)}>You already have an account? Login here.</p>
                }
            </div>
        </div>
    )
}

export default Auth;
