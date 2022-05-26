import React from 'react';
import PageTitle from '../../shared/PageTitle';

const DashboardIndex = () => {
    return (
        <div>
            <PageTitle title={'Dashboard'} />
        <div className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://api.lorem.space/image/fashion?w=1000&h=800)"
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">Welcome to your dashboard. Just catchup what you have and what you want here!</p>
                </div>
            </div>
        </div>
    </div>

    );
};

export default DashboardIndex;