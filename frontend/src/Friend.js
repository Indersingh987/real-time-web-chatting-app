import React,{useEffect,useState} from 'react'
import './Friend.css'
import { Avatar } from '@material-ui/core' 
import axios from 'axios'
import { userData } from'./features/userSlice'
import { useSelector } from 'react-redux'

const Friend = ({friend}) => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [friendData,setFriendData] = useState({})

    // useEffect(() => {
    //     const getFriendById = async () =>{
    //         if(friend){
    //             const { data } = await axios({
    //                 method:'post',
    //                 url:'http://localhost:5000/api/users/findFriendById',
    //                 data:{
    //                     friendDoc:friend,
    //                     loginUser:user.userData._id
    //                 }
    //             })
    //             setFriendData(data)
    //         }
    //     }
    
    //     getFriendById()
    // },[friend,user.userData._id])
    

    return (
        <div className='friend'>
            <Avatar />
            <div className='friend__info'>
                {friendData && (<p>{friendData.name}</p>)}
                {friendData && (<span>{friendData.email}</span>)}
            </div>
        </div>
    )
}

export default Friend
