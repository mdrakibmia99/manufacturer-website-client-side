import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../shared/Loading';
import { useAuthState, useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const Register = () => {
    const [user, loading] = useAuthState(auth);
    const [createUserWithEmailAndPassword,user1,loading1] = useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});
    const [updateProfile, updating] = useUpdateProfile(auth);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageStorageKey = 'a80e92850d333103388e807b03f46a26';
    const navigate=useNavigate();
    if(loading || loading1 || updating){
        return <Loading></Loading>
    }
    if(user || user1){
      navigate('/home')
    }
    const onSubmit = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        // stroe in imgbb db
        const urlImg = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        const postAvatar = async () => {
            const request = await fetch(urlImg, {
                method: "POST",
                body: formData
            });
            const response = await request.json();
            if (response?.success) {
                const name = data?.name;
                const email = data?.email;
                const password=data?.password;
                const avatar = response?.data?.url;

                const user = {
                    name: name,
                    email: email,
                    avatar: avatar
                };

                // store in our db
                const urlUsr = `http://localhost:5000/user`;
                const postUser = async () => {
                    const request = await fetch(urlUsr, {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(user)
                    });
                    const response = await request.json();
                    if (response.insertedId) {
                        toast.success(`register for ${name} done!`);
                        await createUserWithEmailAndPassword(email,password);
                        await updateProfile({displayName:avatar})

                        
                    }
                };
                 postUser();
            }
        };
         postAvatar();
    };
    return (
        <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='text-center'>
                    {/* segment for name */}
                    <div className="form-control w-full max-w-xs mx-auto">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full max-w-xs"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Name is Required'
                                },
                                pattern: {
                                    value: /^[a-z ,.'-]+$/i,
                                    message: 'Provide a valid Name'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            {errors.name?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                        </label>
                    </div>

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

                    {/* segment for password */}
                    <div className="form-control w-full max-w-xs mx-auto">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full max-w-xs"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is Required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Must be 6 characters or longer'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
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

                    <input className='btn w-full max-w-xs text-white hover:bg-white hover:text-black' type="submit" value="Register" />
                </div>
            </form>
        </div>
    );
};

export default Register;