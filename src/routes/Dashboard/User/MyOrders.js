import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import OrderCancellation from './OrderCancellation';

const MyOrders = () => {
    const [user]=useAuthState(auth);
    const url=`http://localhost:5000/userOrders?email=${user?.email}`
    const { data: userOrders, refetch } = useQuery("userOrders", () => fetch(url).then(res => res.json()));
    const [cancelOrder,setCancelOrder]=useState(null);
    const navigate=useNavigate();
    return (
        <div className="overflow-x-auto">
        <table className="table w-full">
            <thead>
                <tr>
                    <th>NO</th>
                    <th>Email</th>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Single Price</th>
                    <th>Total Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    userOrders?.map((userOrder, index) => <tr
                        key={userOrder?._id}
                        className="hover">
                        <th>{index + 1}</th>
                        <td>{userOrder?.email}</td>
                        <td>{userOrder?.toolName}</td>
                        <td> <img src={userOrder?.toolImage}  alt="product-icon" className='w-8 rounded hover:scale-[2] transition duration-300 ease-in-out' /></td>
                        <td> {userOrder?.totalProducts}</td>
                        <td><span className='mr-1'>$</span>{userOrder?.singlePrice}</td>
                        <td><span className='mr-1'>$</span>{userOrder?.totalPrice}</td>
                        <td>
                            {
                                (userOrder?.totalPrice && !userOrder?.paid)?
                                <label htmlFor="order-cancellation" className='btn btn-sm btn-outline btn-error mr-1' onClick={() => setCancelOrder(userOrder)}>Cancel</label>
                                : ""
                            }
                            {
                                        (userOrder?.totalPrice && !userOrder?.paid)
                                        ?
                                        <button className='btn btn-sm btn-outline btn-success ml-1'
                                            onClick={() => navigate(`/dashboard/payment/${userOrder?._id}`)}
                                            >Payment</button>
                                            :
                                            <span className='text-success ml-4'>Paid</span>
                                    }

                        </td>
                    </tr>)
                }
            </tbody>
        </table>
        {
                cancelOrder && <OrderCancellation
                    key={cancelOrder?._id}
                    cancelOrder={cancelOrder}
                    setCancelOrder={setCancelOrder}
                    refetch={refetch}
                />
            }

    </div>
    );
};

export default MyOrders;