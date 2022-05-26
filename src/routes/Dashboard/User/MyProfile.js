import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import ParticleAnimation from '../../../components/ParticleAnimation';
import auth from '../../../firebase.init';
import PageTitle from '../../../shared/PageTitle';



const MyProfile = () => {
    const [user] = useAuthState(auth);
    const [profile, setProfile] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            const url = `https://thawing-wildwood-00183.herokuapp.com/myProfile/${user?.email}`;
            const { data } = await axios.get(url);
          
            setProfile(data);
        };
        getProfile();
    }, [user]);

    const handleMyProfile = (event) => {
        event.preventDefault();

        const email = user?.email;
        const name = user?.displayName;
        const education = event.target.education.value;
        const location = event.target.location.value;
        const phone = event.target.phone.value;
        const linkedin = event.target.linkedin.value;

        const profileInfo = {
            email,
            name,
            education,
            location,
            phone,
            linkedin
        };

        const putMyProfileToDB = async () => {
            const url = `https://thawing-wildwood-00183.herokuapp.com/myProfile`;
            const { data } = await axios.post(url, profileInfo);
         
            window.location.reload();
        };
        putMyProfileToDB();
    };



    return (
        <div className='max-h-screen'>
            <PageTitle title={'Profile'} />
            <ParticleAnimation />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/2 md:w-1/2 w-full bg-slate-300'>
                <div className="flex items-center justify-center">
                    <div className="bg-white mt-10 rounded-t-lg lg:w-1/2 md:w-1/2 w-full">
                        <div className="flex items-center justify-center pt-10 flex-col">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user?.photoURL} alt='avatar' />
                                </div>
                            </div>
                            <h1 className="text-gray-800 font-semibold text-xl mt-5">{user?.displayName}</h1>
                            <h1 className="text-gray-500 text-sm">{user?.email}</h1>
                        </div>

                        {
                            profile?.email
                                ?
                                <form
                                    className='mt-[-100px]'
                                >
                                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto">
                                        <div className="card-body">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Education</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input input-bordered"
                                                    name='education'
                                                    value={profile?.education}
                                                    disabled
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Location</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input input-bordered"
                                                    name='location'
                                                    value={profile?.location}
                                                    disabled
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Phone</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="input input-bordered"
                                                    name='phone'
                                                    value={profile?.phone}
                                                    disabled
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Linkedin</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input input-bordered"
                                                    name='linkedin'
                                                    value={profile?.linkedin}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                :
                                <form
                                    className='mt-4'
                                    onSubmit={handleMyProfile}
                                >
                                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto">
                                        <div className="card-body">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Education</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="education"
                                                    className="input input-bordered"
                                                    name='education'
                                                    required
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Location</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="city/district"
                                                    className="input input-bordered"
                                                    name='location'
                                                    required
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Phone</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    placeholder="phone number"
                                                    className="input input-bordered"
                                                    name='phone'
                                                    required
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Linkedin</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="profile link"
                                                    className="input input-bordered"
                                                    name='linkedin'
                                                    required
                                                />
                                            </div>
                                            <div className="form-control mt-6">
                                                <input
                                                    className="btn btn-primary"
                                                    type="submit"
                                                    value="Save Data"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                        }


                        <div className="flex justify-center p-4">
                            <div>
                                <button
                                    className="text-xs text-green-600 border-2 py-1 border-green-500 btn btn-outline px-8"
                                    onClick={() => {
                                        navigate('/login');
                                        return signOut(auth)
                                    }}
                                >Logout</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyProfile;