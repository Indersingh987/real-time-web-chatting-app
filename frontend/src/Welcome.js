import React from 'react'
import { useHistory } from 'react-router'
import './Welcome.css'


const Welcome = () => {
    const history = useHistory()
    const login = (e) =>{
        e.preventDefault()
        history.push('/login')
    }
    const register = (e) =>{
        e.preventDefault()
        history.push('/register')
    }

    return (
        <div className='welcome'>
            <div className ='welcome__container'>
                <img src='./images/logo.png' 
                alt='brand-logo'/>

                <p>Already have an account ?</p>
                <button className='welcome__button' onClick={login}>
                    Log In
                </button>

                <p>Don't have an account ?</p>
                <button className='welcome__button' onClick={register}>
                    Register
                </button>
            </div>
        </div>
    )
}

export default Welcome
