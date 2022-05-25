
import React from 'react';
import {  useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Loading from '../shared/Loading';

const ProfileUpdate = () => {
    
    const [updateProfile, updating] = useUpdateProfile(auth);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageStorageKey = 'a80e92850d333103388e807b03f46a26';
     if(updating){
         return <Loading></Loading>
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
                const avatar = response?.data?.url;
                
                await updateProfile({displayName:name,photoURL:avatar});
                toast("Please reload website for update your profile")

               
            }
        }; postAvatar();
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

                    <input className='btn w-full max-w-xs text-white hover:bg-white hover:text-black' type="submit" value="Update" />
                </div>
            </form>
        </div>
    );
};

export default ProfileUpdate;