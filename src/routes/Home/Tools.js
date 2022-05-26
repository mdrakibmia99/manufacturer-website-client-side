import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Loading from '../../shared/Loading';


const Tools = () => {
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    const handlePurchase = id => {
        navigate(`/purchase/${id}`);
    }

   
    const { data: products } = useQuery(['products',page], () => fetch(`https://thawing-wildwood-00183.herokuapp.com/products?page=${page}`).then(res => {
        setLoading(false);
        return res.json()
    }))

    useEffect(() => {
        fetch('https://thawing-wildwood-00183.herokuapp.com/productCount')
            .then(res => res.json())
            .then(data => {
                const productCount = data.count;
                const pages = Math.ceil(productCount / 3);
                setPageCount(pages);
            })
    }, [])

    return (
        <div className='container mx-auto lg:py-20 py-10'>
            <h1 className='flex items-baseline justify-center my-5'><i className="fa fa-hashtag text-6xl" aria-hidden="true"></i><span className='text-4xl'>Product tools</span></h1>
            {
                loading && <Loading />
            }
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
                {
                    products?.map(product => <div
                        key={product?._id}
                        className="card bg-base-100 shadow-xl lg:w-11/12"
                    >
                        <figure><img src={product?.toolImage} alt="Hammer" className='max-w-full  object-cover h-40 object-left-top' /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{product?.toolName}</h2>
                            <p className='text-gray-400'>{product?.toolDescription}</p>
                            <p><i className="fa fa-cart-arrow-down mr-1" aria-hidden="true"></i><span className='text-2xl text-secondary'>{product?.toolAvailableQuantity}</span> <span className='text-green-600'>(Available)</span></p>
                            <p className='flex flex-row items-baseline'><i className="fa fa-usd mr-1" aria-hidden="true"></i><span className='text-2xl text-primary'>{product?.toolPrice}</span><span className='text-green-600'>(Single Pice)</span></p>
                            <p><span className={`text-2xl  ${!(product?.toolOrderQuantity <= product?.toolAvailableQuantity) ? 'text-red-500' : 'text-[black]'}`} title={`${!(product?.toolOrderQuantity <= product?.toolAvailableQuantity) ? 'order exceed availability' : 'order justify availability'}`}>Minimum Order Can Be</span> <span className='text-2xl text-secondary font-bold'>{product?.toolOrderQuantity}</span> </p>

                            <div className="card-actions justify-start">
                                <button onClick={() => handlePurchase(product._id)} className="btn hover:btn-primary" disabled={!(product?.toolOrderQuantity <= product?.toolAvailableQuantity)}>Place Order</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>

            {/* pagination add */}
            <div className="py-5">
                <nav className="block">
                    <ul className="flex pl-0 rounded list-none flex-wrap justify-center">
                        {
                            [...Array(pageCount).keys()].map(pageNumber => <button
                                key={pageNumber}
                                className={`hover:scale-[1.4] transition duration-300 ease-in-out ${page === pageNumber ?
                                    "first:ml-0 text-xs  flex w-10 h-10 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 text-white bg-pink-500 cursor-pointer"
                                    :
                                    "first:ml-0 text-xs  flex w-10 h-10 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500 cursor-pointer"}`

                                }
                                onClick={() => setPage(pageNumber)}

                            > {pageNumber + 1} </button>)
                        }
                    </ul>
                    
                </nav>
            </div>


        </div>
    );
};

export default Tools;