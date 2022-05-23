import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';


const Purchase = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:5000/product/${id}`)
            .then(res => setProduct(res?.data[0]))
    }, [id]);
    
    const { _id, toolAvailableQuantity, toolDescription, toolImage, toolName, toolOrderQuantity, toolPrice } = product;
 
    const handlePurchaseOrder = (event) => {
        event.preventDefault();
        let orderCountValue=parseInt(event.target.number.value);
        if(orderCountValue<toolOrderQuantity){
            toast.error(`Your minimum order can be ${toolOrderQuantity}`);
        }else if(orderCountValue>toolAvailableQuantity){
            toast.error(`Exceed the availability.Please order ${toolOrderQuantity} to ${toolAvailableQuantity}`);
        }else{
            const email=user.email;
            const name=user.displayName;
          const totalPrice=orderCountValue*toolPrice;
          const orderData={
              name:name,
              email:email,
              totalPrice:totalPrice,
              singlePrice:toolPrice,
              toolAvailableQuantity,
              toolDescription,
              toolImage,
              toolName
          }
        
            axios.post(`http://localhost:5000/userOrder`,orderData)
                .then(response =>{
                       const {data}=response;
                       if(data.insertedId){
                        console.log(response);
                        toast.success("Your Order confirm.Please check in Dashboard")
                       }
                   
                })
        }
        event.target.reset();


         
    }
    
    return (
        <div>
            <div className="antialiased h-screen grid grid-cols-1 justify-center items-center bg-gray-200 text-gray-900 font-sans p-6">
                <div className="container mx-auto">
                    <div className="flex flex-wrap justify-center -mx-4">
                        <div className="w-full xl:w-3/4 p-4">
                            <div className="c-card  bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden lg:flex md:flex sm:block">
                                <div className="relative lg:w-1/2 md:w-1/2 pb-48 overflow-hidden">
                                    <img className="absolute inset-0 h-full w-full object-fill" src={toolImage} alt="" />
                                </div>
                                <div className="card-body">
                                    <span className="w-fit px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">{_id}</span>
                                    <h2 className="card-title">{toolName}</h2>
                                    <p className='text-gray-400'>{toolDescription}</p>
                                    <p><span className='text-2xl text-secondary'>{toolOrderQuantity}</span> <span className={`${!(toolOrderQuantity <= toolAvailableQuantity) ? 'text-red-500' : 'text-green-600'}`} title={`${!(toolOrderQuantity <= toolAvailableQuantity) ? 'order exceed availability' : 'order justify availability'}`}>(pies minimum order)</span></p>
                                    <p><i className="fa fa-cart-arrow-down mr-1" aria-hidden="true"></i><span className='text-2xl text-secondary'>{product?.toolAvailableQuantity}</span> <span className='text-green-600'>(Available)</span></p>
                                    <p className='flex flex-row items-baseline'><i className="fa fa-usd mr-1" aria-hidden="true"></i><span className='text-2xl text-primary'>{toolPrice}</span> <span className='text-green-600'>(Single Pice)</span></p>
                                </div>
                            </div>
                            <form onSubmit={handlePurchaseOrder} className='w-full lg:w-1/2 mx-auto'>
                                <input type="number" name='number' className="
                                my-2
                          block
                          w-full
                          px-3
                          py-2
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded
                          transition
                          ease-in-out
                          m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder={`Enter Product Quantity ${toolOrderQuantity} to ${toolAvailableQuantity}`}
                                />
                                <input
                                    className="w-full  text-emerald-500 border-2 border-emerald-500 hover:bg-emerald-500 hover:text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 block mt-4"
                                    type="submit"
                                    value={'Order'}
                                />


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


};

export default Purchase;