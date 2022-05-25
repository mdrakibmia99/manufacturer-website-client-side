import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import ReviewCard from '../../components/ReviewCard ';
import auth from '../../firebase.init';
import useReviews from '../../hooks/useReviews';


const Reviews = () => {
    const [user] = useAuthState(auth);
    const [reviews] = useReviews();
    const navigate=useNavigate();
    const lastReview=reviews.length;
    return (
        <div className='text-center lg:py-20 py-10 bg-base-200'>
            <h1 className='flex items-baseline justify-center my-5'><i className="fa fa-hashtag text-6xl" aria-hidden="true"></i><span className='text-4xl'>Reviews of products</span></h1>
            <div className="stat lg:w-2/3 sm:w-full shadow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">

                <div className="stat shadow-md hover:shadow-lg">
                    <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div className="stat-title">Total Likes</div>
                    <div className="stat-value text-primary">25.6K</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat shadow-md hover:shadow-lg">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div className="stat-title">Page Views</div>
                    <div className="stat-value text-secondary">2.6M</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat shadow-md hover:shadow-lg">
                    <div className="stat-figure text-secondary">
                        <div className="avatar online">
                            <div className="w-16 rounded-full">
                                <img src={user?.photoURL} alt='user-avatar' />
                            </div>
                        </div>
                    </div>
                    <div className="stat-value">86%</div>
                    <div className="stat-title">Tasks done</div>
                    <div className="stat-desc text-secondary">31 tasks remaining</div>
                    <div className="stat-desc text-primary">Nice job <span className='font-bold'>{user?.displayName}</span></div>
                </div>
            </div>
            {/* review cards */}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 container mx-auto gap-4 mt-12'>
                {
                    reviews?.slice(lastReview-3,lastReview).map(review => <ReviewCard
                        key={review?._id}
                        review={review}
                    />)
                }
            </div>
             <div>
                 <button onClick={()=>navigate('/home/reviews')} className="border-2 border-secondary py-2 px-4 bg-white text-black hover:bg-secondary hover:text-white font-bold text-sm rounded-lg mt-3"> see more</button>
             </div>
        </div>
    );
};

export default Reviews;