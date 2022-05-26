import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import CustomLink from '../components/CustomLink';
import auth from '../firebase.init';
import navbarLogo from "../images/boos-hamer-logo.webp"


const Navbar = () => {
    const [user,] = useAuthState(auth);
    const [navbarOpen, setNavbarOpen] = useState(false);
    const handleSignOut = () => {
        signOut(auth);
        localStorage.removeItem('accessToken')
    }

    return (
        <div className='shadow-sm  sticky top-0 z-50'>
            <nav className="relative flex flex-wrap items-center justify-between px-2  py-2 bg-white">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link to={'/home'} >
                            <img src={navbarLogo} alt="hammer" className='max-w-[120px]' />
                        </Link>
                        <button
                            className="text-secondary cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)} >
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                    <div
                        className={"lg:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden")}
                        id="example-navbar-danger">
                        <ul className="flex flex-col lg:flex-row lg:items-center sm:items-start lg:mb-0 list-none lg:ml-auto">
                            <li className="nav-item">

                                <CustomLink to={'/home'} className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-secondary hover:opacity-75' > Home</CustomLink>
                            </li>
                            {
                                user && <li className="nav-item">
                                    <CustomLink to={'/dashboard'} className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-secondary hover:opacity-75' >DashBoard</CustomLink>
                                </li>
                            }
                            <li className="nav-item">
                                <CustomLink to={'/portfolio'} className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-secondary hover:opacity-75' >Portfolio</CustomLink>
                            </li>
                            <li className="nav-item">
                                <CustomLink to={'/blogs'} className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-secondary hover:opacity-75' >Blogs</CustomLink>
                            </li>


                            {
                                user ? <li className="nav-item">
                                    <button className='lg:border-2  sm:border-0 px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-secondary hover:opacity-75 lg:ml-7' onClick={handleSignOut}>LogOut </button>
                                </li> :
                                    <li className="nav-item">
                                        <CustomLink to={'/login'} className='lg:border-2 sm:border-0 px-3 py-2 flex items-center text-xs uppercase font-bold  text-secondary hover:opacity-75 lg:ml-7' > LogIn</CustomLink>
                                    </li>
                            }

                            {(user) ?
                                <li className="nav-item flex items-center mb-0">
                                    <p className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-secondary hover:opacity-75 mb-0'>
                                        {`${(user?.displayName) ? user.displayName : ""}`}
                                    </p>
                                    {<img src={user?.photoURL} alt="dp" className='rounded-full w-8 h-8 mr-2' />}
                                </li>
                                :
                                ""

                            }
                        </ul>
                    </div>

                    <div className='w-full flex justify-between'>
                        <div className="navbar-end lg:hidden">
                            <label htmlFor="dashboard-drawer" tabIndex="1" className="btn btn-ghost lg:hidden">
                                <i className="fa fa-tachometer text-xl" aria-hidden="true"></i>
                            </label>
                        </div>
                        <div className="navbar-end lg:hidden">
                            <label htmlFor="portfolio-drawer" tabIndex="1" className="btn btn-ghost lg:hidden">
                                <i className="fa fa-tachometer text-xl" aria-hidden="true"></i>
                            </label>
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    );
};


export default Navbar;