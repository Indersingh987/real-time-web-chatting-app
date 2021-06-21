import React from 'react'
import './Chat.css'
import ChatRoom from './ChatRoom'

const Chat = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    return (
        <div className='chat'>
            <div className='chat__sidebar'>
                <ChatRoom />
                
            </div>
            <div className='chat__box'>

            </div>
        </div>
    )
}

export default Chat
