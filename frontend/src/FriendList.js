import React from 'react'
import './FriendList.css'
import Friend from './Friend'
import { useSelector } from 'react-redux'
import { userData } from './features/userSlice'

const FriendList = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))

    return (
        <div className='friendList'>
            <div className='friendList__container'>
                {user.userData.friends.map(friend=>friend && (<Friend key={friend} friend={friend}/>))}            
            </div>
        </div>
    )
}

export default FriendList
