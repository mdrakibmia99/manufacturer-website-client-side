import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const imageStorageKey = 'a80e92850d333103388e807b03f46a26';

    const onSubmit = async (data) => {
        const image = data?.image[0];
        const formData = new FormData();
        formData.append('image', image);

        // store in imgbb
        const urlImg = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        const postProductImage = async () => {
            const request = await fetch(urlImg, {
                method: "POST",
                body: formData
            });
            const response = await request.json();
            if (response?.success) {
                const productInfo = {
        
                    toolName: data?.product,
                    toolImage: response?.data?.url,
                    toolDescription: data?.desc,
                    toolOrderQuantity: parseInt(data?.min),
                    toolAvailableQuantity: parseInt(data?.max),
                    toolPrice: parseInt(data?.price)
                };

                const postProductToDB = async () => {
                    const url = `https://thawing-wildwood-00183.herokuapp.com/product`;
                    const { data } = await axios.post(url, productInfo);
                    console.log(data);
                    toast.success('Product added successfully!')
                };
                postProductToDB();
            }
        }; postProductImage();
    };
    
        return (
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='text-center'>

                        {/* segment for product name */}
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("product", {
                                    required: {
                                        value: true,
                                        message: 'Product Name is Required'
                                    },
                                    pattern: {
                                        value: /^[a-z ,.'-]+$/i,
                                        message: 'Provide a valid Product Name'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.product?.type === 'required' && <span className="label-text-alt text-red-500">{errors.product.message}</span>}
                                {errors.product?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.product.message}</span>}
                            </label>
                        </div>

                        {/* segment for product description */}
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label">
                                <span className="label-text">Product Description</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your product description"
                                className="input input-bordered w-full max-w-xs"
                                {...register("desc", {
                                    required: {
                                        value: true,
                                        message: 'Description is Required'
                                    },
                                    pattern: {
                                        value: /^[a-z ,.'-]+$/i,
                                        message: 'Provide a valid Description'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.desc?.type === 'required' && <span className="label-text-alt text-red-500">{errors.desc.message}</span>}
                                {errors.desc?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.desc.message}</span>}
                            </label>
                        </div>

                        {/* segment for at least order */}
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label">
                                <span className="label-text">Least order QTY</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Least order QTY"
                                className="input input-bordered w-full max-w-xs"
                                {...register("min", {
                                    required: {
                                        value: true,
                                        message: 'Least QTY is Required'
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/i,
                                        message: 'Provide a valid Least QTY'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.min?.type === 'required' && <span className="label-text-alt text-red-500">{errors.min.message}</span>}
                                {errors.min?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.min.message}</span>}
                            </label>
                        </div>

                        {/* segment for at available order */}
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label">
                                <span className="label-text">Available order QTY</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Available order QTY"
                                className="input input-bordered w-full max-w-xs"
                                {...register("max", {
                                    required: {
                                        value: true,
                                        message: 'Available order QTY is Required'
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/i,
                                        message: 'Provide a valid available order QTY'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.max?.type === 'required' && <span className="label-text-alt text-red-500">{errors.max.message}</span>}
                                {errors.max?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.max.message}</span>}
                            </label>
                        </div>

                        {/* segment for at order price */}
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label">
                                <span className="label-text">Price for each product QTY</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price for each product QTY"
                                className="input input-bordered w-full max-w-xs"
                                {...register("price", {
                                    required: {
                                        value: true,
                                        message: 'Available price ordered QTY is Required'
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/i,
                                        message: 'Provide a valid available price ordered QTY'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.price?.type === 'required' && <span className="label-text-alt text-red-500">{errors.price.message}</span>}
                                {errors.price?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.price.message}</span>}
                            </label>
                        </div>

                        {/* segment for avatar */}
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label">
                                <span className="label-text">Avatar</span>
                            </label>
                            <input
                                type="file"
                                className="w-full max-w-xs border-r border rounded py-2 px-3"
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: 'Image is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                            </label>
                        </div>

                        <input className='btn w-full max-w-xs text-white hover:bg-white hover:text-black' type="submit" value="Add Product" />
                    </div>
                </form>
            </div>
        );
    };

    export default AddProduct;