import React,{useState} from 'react'
import './Chat.css'
import { Avatar,IconButton } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile';

const rooms = [1,2,3,4,5,6,7,8,9,10,11,12,13]

const Chat = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [roomId,setRoomId] = useState()
    const handleRoom = (e,roomId) => {
        e.preventDefault()
        setRoomId(roomId)
        console.log(roomId)
    }

    return (
        <div className='chat'>
            <div className='chat__sidebar'>
                {rooms.map(room=>(<div className={`chatRoom ${room == roomId && 'chatRoom-selected'}`} onClick={(e)=>handleRoom(e,room)}>
                                    <Avatar />
                                    <div className='chatRoom__info' >
                                        <p>name</p>
                                        <span>last message </span>
                                    </div>
                                </div>))}
            </div>

            {/* chat box */}
            <div className='chat__box'>
                <div className='chat__box__header' >
                    <Avatar />
                    <div className='chat__box__header__info'>
                        <p>name</p>
                        <span>last seen at</span>
                    </div>
                </div>
                <div className='chat__box__main'>
                        <div className='chat__box__main__message message-sender'>
                            <strong>name</strong>
                            <p>this is room no {roomId}</p>
                            <span>timestamp</span>
                        </div>
                </div>
                <div className='chat__box__footer'>
                    <IconButton >
                        <AttachFileIcon />
                    </IconButton>
                    <div className='chat__box__footer__form'>
                        <input placeholder='send a message...'/>
                        <button type='submit'>send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
