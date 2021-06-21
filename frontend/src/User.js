import React from 'react'
import './User.css'
import { Avatar } from '@material-ui/core'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { userData } from './features/userSlice'

const User = ({id,name,email}) => {
    const user = useSelector(userData)

    const sendRequest = (e) =>{
        e.preventDefault()

        const friendRequest = async () =>{
            
            const { data } = await axios({
                method:'post',
                url:'http://localhost:5000/api/users/request',
                data:{ to:{
                          name:name,
                          email:email
                       },
                       from:{
                           name:user.userData.name,
                           email:user.userData.email
                       }}
            })
            console.log(data)
        }
        
      
        friendRequest()
    }

    return (
        <div className='user'>
            <Avatar />
            <div className='user__info'>
                <p>{name}</p>
                <span>{email}</span>
            </div>
            <button onClick={(e)=>sendRequest(e)} className = 'user__request'>
                 Request
            </button>
        </div>
    )
}

export default User
