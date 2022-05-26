import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';


const Portfolio = () => {
    return (
        <div className="drawer drawer-mobile z-0">
        <input id="portfolio-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content mt-4 ">
            {/* <!-- Page content here --> */}
            <Outlet />
        </div>
        <div className="drawer-side shadow-2xl h-full bg-black  flex items-center">
            <label htmlFor="portfolio-drawer" className="drawer-overlay "></label>
            <ul className="menu p-4 n overflow-y-auto w-80  text-base-content bg-black">
                            <li className='bg-black text-white '><NavLink className="" to="/portfolio/aboutMe">About Me</NavLink></li>
                            <li className='bg-black text-white'><NavLink className="" to="/portfolio/education">About Education</NavLink></li>
                            <li className='bg-black text-white'><NavLink className="" to="/portfolio/project">About Project</NavLink></li>
                            <li className='bg-black text-white'><NavLink className="" to="/portfolio/technology">About Technology</NavLink></li>
    
            </ul>
        </div>
    </div>
        );
    };
    
    export default Portfolio;
  
