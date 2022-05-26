import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../../shared/Loading';




const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signInWithEmailAndPassword, userEP, loading, error] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, userGL, loading1, error1] = useSignInWithGoogle(auth);
    const [token] = useToken(userEP || userGL);
          
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    useEffect( () =>{
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, from, navigate])

    const onSubmit = data => {
        const email = data?.email;
        const password = data?.password;
        signInWithEmailAndPassword(email, password);
    };
    const handleGoogleLogin=async()=>{
        await signInWithGoogle();
      }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className='w-full'>
                <form onSubmit={handleSubmit(onSubmit)} className="border-2 lg:w-1/4 w-full mx-auto shadow-lg p-5 rounded-lg">
                    <div className='text-center'>
                        <h3 className='text-center text-2xl text-green-500'>Login!</h3>
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

                        <div className='mb-4'>
                            <Link className='text-red-500 hover:underline pr-2 border-r' to={'/reset'}>Forgot Password</Link>
                            <Link className='text-green-600 hover:underline pl-2 border-l' to={'/register'}>Create new account</Link>
                        </div>
                        {loading && <Loading></Loading>}
                        {error ? <p className='text-[red]'>{error.message}</p> : ""}
                        <input className='btn w-full max-w-xs text-white hover:text-black hover:bg-white' type="submit" value="Login" />
                    </div>
                </form>
                <div className='lg:w-1/4 w-full mx-auto'>
                    {loading1 && <Loading></Loading>}
                    {error1 &&  <p className='text-red'> {error1?.message}</p>}
                    <div>
                <div className="divider">OR</div>
            <button className="border-2 border-black bg-white py-2 hover:bg-b hover:bg-black hover:text-white  w-full mb-3  font-bold rounded"
                type="submit" onClick={handleGoogleLogin}><i className="fa fa-google text-green-700" aria-hidden="true"></i> Sign in with google</button>
        </div>
                </div>
            </div>
        </div>
    );
};

export default Login;



