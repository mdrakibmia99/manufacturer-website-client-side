import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../../shared/Loading';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51L19f1KRH8pza7uwgnzclYxnZ2NFCFnLEJE5sNWCxZGJ3IxKdPaeekCsJKRIvbUtZGCGwVsF2Nq6fDvs2icv529q005HXN9rtU');

const Payment = () => {
    const { id } = useParams();
    const url = `https://thawing-wildwood-00183.herokuapp.com/userOrder/${id}`;
    const { data: userOrder, isLoading } = useQuery(['userOrder', id], () => fetch(url).then(res => res.json()));

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Pay for <span className='text-primary'>{userOrder?.toolName}</span></h2>
                    <p>You are ordering QTY: <span className='text-purple-500 text-xl'>{userOrder?.totalProducts}</span></p>
                    <p>Total price to pay is: $<span className='text-red-500 text-xl'>{userOrder?.totalPrice}</span></p>
                </div>
                <div className="card-body bg-base-200">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            userOrder={userOrder}
                        />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;