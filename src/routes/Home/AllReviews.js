import React from 'react';
import ReviewCard from '../../components/ReviewCard ';
import useReviews from '../../hooks/useReviews';

const AllReviews = () => {
    const[reviews]=useReviews();

    return (
        <div> 
             <h1 className='flex items-baseline justify-center my-5'><i className="fa fa-hashtag text-6xl" aria-hidden="true"></i><span className='text-4xl'>All Reviews of products</span></h1>
           <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 container mx-auto gap-4 mt-12'>
                {
                    reviews?.map(review => <ReviewCard
                        key={review?._id}
                        review={review}
                    />)
                }
            </div>
        </div>
    );
};

export default AllReviews;