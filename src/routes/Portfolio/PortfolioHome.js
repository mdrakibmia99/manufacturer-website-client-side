import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioHome = () => {
    return (
        <div class="hero min-h-screen"  style={{backgroundImage:`url(https://api.lorem.space/image/fashion?w=1000&h=800)`,}} >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-start text-neutral-content">
          <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">I'am Rakib Mia</h1>
            <p class="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <Link to={'aboutMe'} class="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </div>
    );
    
};

export default PortfolioHome;