import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../../shared/Loading';

const ManageOrders = () => {
    const { data: manageOrders, isLoading, refetch } = useQuery('manageOrders', () => fetch("https://thawing-wildwood-00183.herokuapp.com/userOrders").then(res => res.json()));
    const reduceAvailability = (totalProducts, availableQTY, id,orderId) => {
        console.log("order id",orderId)

        const url = `https://thawing-wildwood-00183.herokuapp.com/userOrder/${id}`;
        const updateAvailability = async () => {
            const { data } = await axios.put(url, { toolAvailableQuantity: (parseInt(availableQTY) - parseInt(totalProducts))});
            refetch();
            console.log(data);
        };
        updateAvailability();


        const url2 = `https://thawing-wildwood-00183.herokuapp.com/userOrderProduct/${orderId}`;
        const updateAvailability2 = async () => {
            const { data } = await axios.put(url2, { toolAvailableQuantity: (parseInt(availableQTY) - parseInt(totalProducts))});
            refetch();
        };
        updateAvailability2();




      
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
                                            onClick={() => reduceAvailability(userOrder?.totalProducts, userOrder?.toolAvailableQuantity, userOrder?._id ,userOrder?.orderId)}
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