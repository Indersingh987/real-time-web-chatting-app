import React,{ useState,useEffect } from 'react'
import './Login.css'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { checkLogin,userData } from './features/userSlice'
import { useDispatch,useSelector } from 'react-redux'

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(userData)
    const [err, setError] = useState(null)

    useEffect(() => {
        if(user.IsLogin) history.push('/main')
        else if(user.message === 'check your email') setError(true)
        else setError(false)
    }, [user])
    

    const { register, handleSubmit, formState: { errors }} = useForm();


    const onSubmit =  (formData) => {
        dispatch(checkLogin(formData))
    };

    return (
        <div className='login'>
            <div className ='login__container'>
                <img src='./images/logo.png' 
                alt='brand-logo'/>
                <form className='login__form' onSubmit={handleSubmit(onSubmit)}>

                    <label>Email:</label>
                    <input {...register('email', { required: true,pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i })} 
                    type='email'
                    placeholder='Email'/>
                    {errors.email ? <span className='login__invalid'>Enter valid email</span>:err && <span className='login__invalid'>{user.message}</span>}

                    <label>Password:</label>
                    <input {...register('password', { required: true })} 
                    type='password'
                    placeholder='Password'/>
                    {errors.password ? <span className='login__invalid'>Password is required.</span>:!err && <span className='login__invalid'>{user.message}</span>}

                    <button className='login__button'
                    type="submit">
                        Log In
                    </button>

                    <p>Don't have account ? 
                        <Link to='./register'>
                            create account 
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
