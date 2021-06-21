import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'


const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <div className='register'>
            <div className ='register__container'>
                <img src='./images/logo.png' 
                alt='brand-logo'/>
                <form className='register__form'
                onSubmit={handleSubmit(onSubmit)}>

                    <label>Name:</label>
                    <input {...register('password', { required: true })} 
                    type='password'
                    placeholder='Password'/>
                    {errors.password && <span className='register__invalid'>Name is required.</span>}

                    <label>Email:</label>
                    <input {...register('email', { required: true,pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i })} 
                    type='email'
                    placeholder='Email'/>
                    {errors.email && <span className='register__invalid'>Email valid email</span>}

                    <label>Password:</label>
                    <input {...register('password', { required: true })} 
                    type='password'
                    placeholder='Password'/>
                    {errors.password && <span className='register__invalid'>Password is required.</span>}
                    
                    <button className='register__button'
                    type='submit'>
                        Register
                    </button>

                    <p>Already have account ? 
                        <Link to='./login'>
                            log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register
