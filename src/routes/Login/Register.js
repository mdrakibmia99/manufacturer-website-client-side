import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../shared/Loading';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import useToken from '../../hooks/useToken';



const Register = () => {
 
    const [createUserWithEmailAndPassword, userEP, loading, error] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [signInWithGoogle, userGL, loading1, error1] = useSignInWithGoogle(auth);
    const [updateProfile, updating] = useUpdateProfile(auth);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [token]=useToken(userEP || userGL);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    if (loading || loading1 || updating) {
        return <Loading></Loading>
    }
    if (token) {
        navigate(from, { replace: true });
    }



    const onSubmit = async (data) => {
        const name = data?.name;
        const email = data?.email;
        const password = data?.password;
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name,photoURL:"https://i.ibb.co/LtxYmTj/user.png" });

    };
  const handleCreateGoogleLogin=async()=>{
    await signInWithGoogle();
  }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className='w-full'>
                <form className="p-5 rounded-lg lg:w-1/4 w-full shadow-lg border-2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <div className='text-center'>
                        <h3 className='text-center text-2xl text-green-500'>Register!</h3>
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
                        {loading1 && <Loading></Loading>}
                        {error ? <p className='text-[red]'>{error?.message || error1?.message}</p> : ""}
                        <p className='py-3'>Already have an account?<Link to="/login" className='hover:text-black text-green-400'>Login</Link></p>
                        <input className='btn w-full max-w-xs text-white hover:bg-white hover:text-black' type="submit" value="Register" />
                    </div>
                </form>
                <div className='lg:w-1/4 w-full mx-auto'>
                <div >
                {loading1 && <loading></loading>}
                    {error1 &&  <p className='text-red'> {error1?.message}</p>}
            <div className="divider">OR</div>
            <button className="border-2 border-black bg-white py-2 hover:bg-b hover:bg-black hover:text-white  w-full mb-3  font-bold rounded"
                type="submit" onClick={handleCreateGoogleLogin}><i className="fa fa-google text-green-700" aria-hidden="true"></i> Sign in with google</button>

        </div>
                </div>
            </div>
        </div>
    );
};

export default Register;