import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../../shared/Loading';


const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    let catchError;
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    if (loading) {
        return <Loading></Loading>
    }
    if (error) {
        catchError = <p>Error: {error?.message} </p>
    }
    if (user) {
        navigate(from, { replace: true })
    }
    return (
        <div >
            <div className="divider">OR</div>
            <button className="border-2 border-black bg-white py-2 hover:bg-b hover:bg-black hover:text-white  w-full mb-3  font-bold rounded"
                type="submit" onClick={() => signInWithGoogle()}><i className="fa fa-google text-green-700" aria-hidden="true"></i> Sign in with google</button>
            {catchError}
        </div>
    );
};

export default SocialLogin;