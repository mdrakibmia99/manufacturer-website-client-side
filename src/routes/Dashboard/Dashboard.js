import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet } from 'react-router-dom';
import CustomLink from '../../components/CustomLink';
import auth from '../../firebase.init';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    return (
        <div className="drawer drawer-mobile -z-0">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content mt-4 ">
                {/* <!-- Page content here --> */}
                <h1 className='text-4xl mb-4'>Welcome, <span className='text-secondary'>{user?.displayName}</span> to dashboard.</h1>
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80  text-base-content bg-gray-500">
                    {/* <!-- Sidebar content here --> */}
                    <li><CustomLink to="/dashboard" className="p-3">My Orders</CustomLink></li>
                    <li><CustomLink to="/dashboard/addingReview" className="p-3">Adding Review</CustomLink></li>
                    <li><CustomLink to="/dashboard/addProduct" className="p-3">Adding Product</CustomLink></li>
                    <li><CustomLink to="/dashboard/makeAdmin" className="p-3">Make Admin</CustomLink></li>
                    <li><CustomLink to="/dashboard/manageOrders" className="p-3">Manage Orders</CustomLink></li>
                    <li><CustomLink to="/dashboard/manageProducts" className="p-3">Manage Products</CustomLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
