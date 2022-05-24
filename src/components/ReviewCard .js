import React from 'react';
const ReviewCard = ({ review }) => {
    const {ratings}=review;

    return (
        <div
            className="card bg-base-100 shadow-xl"
        >
            <figure className="px-10 pt-10 relative">
                <img src={review?.reviewerAvatar} alt="reviewer" className="rounded-xl h-[426px] object-cover object-top" />
                <span className='absolute top-8 left-4 bg-secondary text-white rounded-xl px-4'>{review?.reviewerEmail}</span>
            </figure>
            <div className="card-body items-center text-justify">
                <h2 className="card-title">{review?.reviewerName}</h2>
                <p>{review?.reviewerSpeech}</p>
                <div className="rating rating-sm flex items-center">
                    <span>Ratings: </span>
                    {
                        [...Array(ratings).keys()].map((rating, index) => <div
                            key={rating}
                        >
                            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" disabled checked={rating === (index + 1)} />
                        </div>)
                    }


                </div>
            </div>
        </div>

    );
};

export default ReviewCard;