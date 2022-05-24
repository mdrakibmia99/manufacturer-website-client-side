import React, { useState } from 'react';
import { useQuery } from 'react-query';
import OrderCancellation from '../User/OrderCancellation';

const ManageProducts = () => {
    const { data: userOrders, refetch } = useQuery("userOrders", () => fetch("http://localhost:5000/userOrders").then(res => res.json()));
  const [cancelOrder,setCancelOrder]=useState(null);
  console.log("userorders",userOrders);
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
                            <label htmlFor="order-cancellation" className='btn btn-sm btn-outline btn-error mr-1' onClick={() => setCancelOrder(userOrder)}>Cancel</label>
                            <button className='btn btn-sm btn-outline btn-success ml-1'>Payment</button>
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

export default ManageProducts;