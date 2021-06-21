import React from 'react'
import './Request.css'
import { Avatar } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { useSelector } from 'react-redux';
import { userData } from './features/userSlice'
import axios from 'axios'

const Request = ({id,name,email}) => {
    const user = JSON.parse(sessionStorage.getItem('user'))

    const requestAccept = async () =>{
        const { data } = await axios({
            method:'post',
            url:'http://localhost:5000/api/request/accept',
            data:{
                  id:id,
                  loginUser:user.userData.email,
                  requestUser:email
            }
        })
        console.log(data)
    }

    const requestReject = async () =>{
        const { data } = await axios({
            method:'post',
            url:'http://localhost:5000/api/request/reject',
            data:{
                id:id,
                loginUser:user.userData.email,
                requestUser:email
            }
        })
       
    }

    return (
        <div className='request'>
            <Avatar />
            <div className='request__info'>
                <p>{name}</p>
                <span>{email}</span>
            </div>
            <div className = 'request__icon'>
                <CheckCircleIcon color='primary' cursor='pointer' onClick={requestAccept} />
                <CancelIcon color='secondary' cursor='pointer' onClick={requestReject} />
            </div>
        </div>
    )
}

export default Request
