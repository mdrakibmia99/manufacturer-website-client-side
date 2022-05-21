import React from 'react';
import { useForm } from 'react-hook-form';

const Reset = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data.email, data.password);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='text-center'>
                    {/* segment for email */}
                    <div className="form-control w-full max-w-xs mx-auto">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is Required'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid Email'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>

                    <input className='btn w-full max-w-xs text-white hover:text-black hover:bg-white' type="submit" value="Reset" />
                </div>
            </form>
        </div>
    );
};

export default Reset;