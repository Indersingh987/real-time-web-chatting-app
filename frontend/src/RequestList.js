import React,{useEffect,useState} from 'react'
import './RequestList.css'
import Request from './Request'
import { userData } from './features/userSlice'
import axios from 'axios'
import { useSelector } from 'react-redux'


const RequestList = () => {
    const [requestUsers,setRequestUsers] = useState([])
    // const user = JSON.parse(sessionStorage.getItem('user'))
    
    // useEffect(() => {
    //     const fetchRequestUser = async () =>{
    //         if(user.userData.requestList.length){
    //             const { data } = await axios({
    //                 method:'post',
    //                 url:'http://localhost:5000/api/users/findById',
    //                 data:{
    //                       ids:user.userData.requestList
    //                     }
    //             })
    //             setRequestUsers(data)
    //         }
    //     }
    //     fetchRequestUser()
       
    // }, [user.userData.requestList.length,user.userData.requestList])

    return (
        <div className='requestList'>
            <div className='requestList__container'>
               {/* {requestUsers.length && requestUsers.map(user=>(<Request key={user._id} id={user._id} name={user.name} email={user.email} />))} */}
               <Request />
            </div>
        </div>
    )
}

export default RequestList
