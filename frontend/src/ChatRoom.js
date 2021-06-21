import { Avatar } from '@material-ui/core'
import React from 'react'
import './ChatRoom.css'

const ChatRoom = () => {
    return (
        <div className='chatRoom'>
            <Avatar />
            <div className='chatRoom__info' >
                <p>name</p>
                <span>last message </span>
            </div>
        </div>
    )
}

export default ChatRoom
