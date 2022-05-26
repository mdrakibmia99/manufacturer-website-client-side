import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../../shared/Loading';

const ManageOrders = () => {
    const { data: manageOrders, isLoading, refetch } = useQuery('manageOrders', () => fetch("http://localhost:5000/userOrders").then(res => res.json()));
     console.log("mange order",manageOrders)
    const reduceAvailability = (totalProducts, availableQTY, id) => {
        console.log("mange order 2",totalProducts,availableQTY)

        const url = `http://localhost:5000/userOrder/${id}`;
        const updateAvailability = async () => {
            const { data } = await axios.put(url, { toolAvailableQuantity: (parseInt(availableQTY) - parseInt(totalProducts)) });
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
                        <td>{userOrder?.email}</td>
                        <td>{userOrder?.toolName}</td>
                        <td> {userOrder?.totalProducts}</td>
                        <td><span className='mr-1'>$</span>{userOrder?.totalPrice}</td>
                        <td>
                           
                            {
                                userOrder?.paid
                                    ?
                                    userOrder?.approval
                                        ?
                                        <span className='text-success'>TYSM</span>
                                        :
                                        <button
                                            className='btn btn-outline btn-success'
                                            onClick={() => reduceAvailability(userOrder?.totalProducts, userOrder?.toolAvailableQuantity, userOrder?._id)}
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