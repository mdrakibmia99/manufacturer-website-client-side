import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../shared/Loading';


const Tools = () => {
    const [loading, setLoading] = useState(true);

    const { data: products } = useQuery('products', () => fetch('http://localhost:5000/products').then(res => {
        setLoading(false);
        return res.json()
    }))

    return (
        <div className='container mx-auto lg:py-20 py-10'>
            <h1 className='flex items-baseline justify-center my-5'><i className="fa fa-hashtag text-6xl" aria-hidden="true"></i><span className='text-4xl'>Product tools</span></h1>
            {
                loading && <Loading/>
            }
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                {
                    products?.slice(0, 6)?.map(product => <div
                        key={product?._id}
                        className="card card-side bg-base-100 shadow-xl"
                    >
                        <figure><img src={product?.toolImage} alt="Hammer" className='w-40 max-w-full object-cover h-40 object-left-top' /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{product?.toolName}</h2>
                            <p className='text-gray-400'>{product?.toolDescription}</p>
                            <p><i className="fa fa-cart-plus mr-1" aria-hidden="true"></i><span className='text-2xl text-secondary'>{product?.toolOrderQuantity}</span> <span className={`${!(product?.toolOrderQuantity <= product?.toolAvailableQuantity) ? 'text-red-500' : 'text-green-600'}`} title={`${!(product?.toolOrderQuantity <= product?.toolAvailableQuantity) ? 'order exceed availability' : 'order justify availability'}`}>(Ordered)</span></p>
                            <p><i className="fa fa-cart-arrow-down mr-1" aria-hidden="true"></i><span className='text-2xl text-secondary'>{product?.toolAvailableQuantity}</span> <span className='text-green-600'>(Available)</span></p>
                            <p className='flex flex-row items-baseline'><i className="fa fa-usd mr-1" aria-hidden="true"></i><span className='text-2xl text-primary'>{product?.toolPrice}</span></p>
                            <div className="card-actions justify-start">
                                <button className="btn hover:btn-primary" disabled={!(product?.toolOrderQuantity <= product?.toolAvailableQuantity)}>Place Order</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Tools;