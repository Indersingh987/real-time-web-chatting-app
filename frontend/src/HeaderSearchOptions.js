import React from 'react'
import './HeaderSearchOptions.css'
import User from './User'
import { searchData } from './features/userSlice'
import { useSelector } from 'react-redux'

function HeaderSearchOptions() {
    const searchResponse = useSelector(searchData)

    return (
        <div className='headerSearchOptions' 
        >
         {searchResponse.IsAny ? searchResponse.users.map(user=>(<User key={user._id} id={user._id} name={user.name} email={user.email}/>)):(<p>no result</p>)}   
        </div>
    )
}

export default HeaderSearchOptions
