import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../../shared/Loading';

const ManageOrders = () => {
    const { data: manageOrders, isLoading, refetch } = useQuery('manageOrders', () => fetch("http://localhost:5000/userOrders").then(res => res.json()));

    const reduceAvailability = (totalQTY, availableQTY, id) => {
        // console.log(totalQTY, availableQTY);
        const url = `http://localhost:5000/userOrder/${id}`;
        // const toolAvailableQuantity = parseInt(availableQTY) - parseInt(totalQTY);
        const updateAvailability = async () => {
            const { data } = await axios.put(url, { toolAvailableQuantity: (parseInt(availableQTY) - parseInt(totalQTY)) });
            refetch();
            console.log(data);
        };
        updateAvailability();
    };

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
        <table className="table w-full">
            <thead>
                <tr>
                    <th></th>
                    <th>Email</th>
                    <th>Product Name</th>
                    <th>Total QTY</th>
                    <th>Total Prize</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    manageOrders?.map((userOrder, index) => <tr
                        key={userOrder?._id}
                        className="hover">
                        <th>{index + 1}</th>
                        <td>{userOrder?.userEmail}</td>
                        <td>{userOrder?.toolName}</td>
                        <td> {userOrder?.quantity}</td>
                        <td><span className='mr-1'>$</span>{userOrder?.totalPrize}</td>
                        <td>
                            {/* {
                                !userOrder?.paid
                                &&
                                <label htmlFor="order-cancellation" className='btn btn-sm btn-outline btn-error mr-1' onClick={() => setCancelOrder(userOrder)}>Cancel</label>
                            }
                            {
                                (userOrder?.totalPrize && !userOrder?.paid)
                                    ?
                                    <button className='btn btn-sm btn-outline btn-success ml-1'
                                        onClick={() => navigate(`/dashboard/payment/${userOrder?._id}`)}
                                    >Payment</button>
                                    :
                                    <span className='text-success ml-4' title='wait for admins confirmation'>Paid</span>
                            } */}
                            {
                                userOrder?.paid
                                    ?
                                    userOrder?.approval
                                        ?
                                        <span className='text-success'>TYSM</span>
                                        :
                                        <button
                                            className='btn btn-outline btn-success'
                                            onClick={() => reduceAvailability(userOrder?.quantity, userOrder?.toolAvailableQuantity, userOrder?._id)}
                                        >Make Done</button>
                                    :
                                    <span className='text-error font-bold'>Still not paying</span>
                            }
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
    );
};

export default ManageOrders;