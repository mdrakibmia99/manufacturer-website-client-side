import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet } from 'react-router-dom';
import CustomLink from '../../components/CustomLink';
import auth from '../../firebase.init';
import Loading from '../../shared/Loading';

const Dashboard = () => {

    const [user, loading] = useAuthState(auth);
    const [userRole, setUserRole] = useState("")
    useEffect(() => {
        const url = `http://localhost:5000/user/${user?.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setUserRole(data))


    },[])

    if (loading) {
        return <Loading />
    }
    console.log("user role", userRole)
    return (
        <div className="drawer drawer-mobile z-0">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content mt-4 ">
                {/* <!-- Page content here --> */}
                <h1 className='text-4xl mb-4'>Welcome, <span className='text-secondary'>{user?.displayName}</span> to dashboard.</h1>
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80  text-base-content bg-white">

                    {
                        userRole?.role === "admin" ?
                            <>
                                <li className='bg-black'><CustomLink className="p-3" to="/dashboard/addProduct">Adding Product</CustomLink></li>
                                <li className='bg-black'><CustomLink className="p-3" to="/dashboard/makeAdmin">Make Admin</CustomLink></li>
                                <li className='bg-black'><CustomLink className="p-3" to="/dashboard/manageOrders">Manage Orders</CustomLink></li>
                                <li className='bg-black'><CustomLink className="p-3" to="/dashboard/manageProduct">Manage Product</CustomLink></li>
                            </> :
                            <>
                                <li className='bg-black' ><CustomLink className="p-3" to="/dashboard">My Orders</CustomLink></li>
                                <li className='bg-black'><CustomLink className="p-3" to="/dashboard/addingReview">Adding Review</CustomLink></li>
                            </>

                    }
                    <li className='bg-black'><CustomLink className="p-3" to="/dashboard/profile">My Profile</CustomLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
