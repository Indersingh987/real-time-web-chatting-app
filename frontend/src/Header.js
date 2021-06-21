import React,{useState,useEffect} from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch,useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { SearchOutlined,PowerSettingsNew} from '@material-ui/icons'
import './Header.css'
import User from './User'

import { setScreen } from './features/screenSlice'
import { userData,searchUser,searchData } from './features/userSlice'

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(userData)
    const searchResponse = useSelector(searchData)

    const [chat, setChat] = useState(true)
    const [requests, setRequests] = useState(false)
    const [friends, setFriends] = useState(false)
    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch(setScreen({
            chat,
            requests,
            friends
        }))
        
    }, [dispatch,chat,requests,friends])
    
    const findUser = (e) =>{
        e.preventDefault()
        dispatch(searchUser({
            name:search,
            loginUser:user.userData.email
        }))
    }

    const signout = (e) =>{
        sessionStorage.clear()
        history.push('/')
    } 

    return (
        <div className='header' >
            <Avatar className='header__img'/>

            <div className='header__middle'  onFocus={()=>setDisplay(false)}>

                <p onClick={()=>{
                    setChat(true)
                    setRequests(false)
                    setFriends(false)
                }}
                className={chat?'screen--selected':''}>Chat</p>

                <p  onClick={()=>{
                    setChat(false)
                    setRequests(true)
                    setFriends(false)
                }}
                className={requests ? `screen--selected`:''}>Requests</p>

                <p  onClick={()=>{
                    setChat(false)
                    setRequests(false)
                    setFriends(true)
                }}
                 className={friends ?'screen--selected':''}>Friends</p>
            </div>

            <div className='header__right'>
                <input type='text' placeholder="search.." 
                onChange = {(e)=>setSearch(e.target.value)}
                />

                <IconButton onClick={(e)=>findUser(e)}
                             onFocus={()=>setDisplay(true)}
                             >
                    <SearchOutlined />
                </IconButton>

                <IconButton onClick = {signout}>
                    <PowerSettingsNew />
                </IconButton>
            </div>
            {display && (<div className='header__headerSearchOptions' >
                        <CloseIcon className='header__headerSearchOptions__close' onClick={()=>setDisplay(false)}/>
                         {searchResponse.IsAny ? searchResponse.users.map(user=>(<User key={user._id} id={user._id} name={user.name} email={user.email}/>)):(<p>no result</p>)}   
                        </div>)}
        </div>
    )
}

export default Header
