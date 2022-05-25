import React from 'react'
import { useNavigate } from 'react-router-dom';
import notFoundIng from './pagenotfound.jpg';


const PageNotFound = () => {
    const navigate=useNavigate();
    return (
        <div className="min-h-screen flex justify-center items-center">
           <div className='text-center max-w-3xl'>
           <h1 className='text-primary text-4xl font-bold'>Oops..! 404 Page Not Found</h1>
            <p className='text-xl font-bold pt-2'>Looks like you came to wrong page on our server</p>
            <img src={notFoundIng} className="w-full object-contain max-w-[500px] " alt="not found" />
           <input type="button"onClick={()=>navigate('/home')} value="Home Page" className='border-2 p-1 rounded-lg border-primary text-black font-bold hover:text-white hover:bg-primary' />
           </div>
        </div>

    )
}

export default PageNotFound;