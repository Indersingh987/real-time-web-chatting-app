import React from 'react'
import './Main.css'
import Header from './Header'
import Chat from './Chat'
import RequestList from './RequestList'
import FriendList from './FriendList'
import { useSelector } from 'react-redux'

import { selectScreen } from './features/screenSlice'

const Main = () => {
    const { chat,requests,friends } = useSelector(selectScreen)
    const user = JSON.parse(sessionStorage.getItem('user'))
    
    return (
        <div className='main'>
            <div className='main__container'>
                <Header />
                {chat && (<Chat />)}
                {requests && (<RequestList />)}
                {friends && (<FriendList />)}
            </div>
        </div>
    )
}

export default Main
