import axios from 'axios';
import React from 'react';

const OrderCancellation = ({ cancelOrder, setCancelOrder, refetch }) => {

    const handleOrderCancel = (id) => {
        const deleteUserOrder = async () => {
            const url = `https://thawing-wildwood-00183.herokuapp.com/userOrder/${id}`;
            const { data } = await axios.delete(url);
       
            refetch();
            setCancelOrder(null);
        };
        deleteUserOrder();
    };
    return (
        <div>
            <input type="checkbox" id="order-cancellation" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Congratulations random Interner user!</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div className="modal-action">
                        <label htmlFor="order-cancellation" className="btn btn-sm btn-outline btn-success" onClick={() => handleOrderCancel(cancelOrder._id)}>Okay</label>
                        <label htmlFor="order-cancellation" className="btn btn-sm btn-outline btn-error">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default OrderCancellation;
