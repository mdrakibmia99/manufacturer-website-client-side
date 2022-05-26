import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioHome = () => {
    return (
        <div className="hero min-h-screen"  style={{backgroundImage:`url(https://api.lorem.space/image/fashion?w=1000&h=800)`,}} >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-start text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">I'am Rakib Mia</h1>
            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <Link to={'aboutMe'} className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </div>
    );
    
};

export default PortfolioHome;