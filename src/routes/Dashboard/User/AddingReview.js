import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../../shared/Loading';

const AddingReview = () => {
    const [user,loading] = useAuthState(auth);
    const [ratingError,setRatingError]=useState("");
    console.log("user printf",user)
    if(loading){
        return <Loading></Loading>
    }
    const handleOrderedProduct = (event) => {
        event.preventDefault();
        const comment=event.target.comment.value;
        const rating=parseInt(event.target.rating.value);

        if(rating>0 && rating<6){

            const reviewData={
                reviewerName:user?.displayName,
                reviewerSpeech:comment,
                reviewerEmail:user?.email,
                reviewerAvatar:user?.photoURL || "https://i.ibb.co/LtxYmTj/user.png",
                ratings:rating
            }
            const email=user?.email
            axios.put(`http://localhost:5000/reviews/${email}`, reviewData)
            .then(response => {
                const { data } = response;
                if (data.acknowledged) {
                    console.log(response);
                    toast.success("Your reviews done.Check Home page")
                    event.target.reset();
                }

            })
           
        }else{
            setRatingError("Error:Rating must be 1 to 5")
        }
        
    }
    return (
        <div>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content lg:flex-row">
                    <div class="text-center lg:text-left lg:w-1/3 pr-5 hidden lg:block">
                        <h1 class="text-5xl font-bold">Reviews !!</h1>
                        <p class="py-6">Please Write a review.write your experience for how easy to use the site is.</p>
                    </div>
                    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        
                            <form
                                className="card w-96 sm-w-full bg-base-100 shadow-xl mx-auto"
                                onSubmit={handleOrderedProduct}
                            >
                                <div className="card-body">
                                    <input
                                        type="text"
                                        value={user?.displayName}
                                        class="input input-bordered w-full max-w-xs mb-4"
                                        name="email"
                                        readOnly
                                    />
                                    <input
                                        type="text"
                                        value={user?.email}
                                        class="input input-bordered w-full max-w-xs mb-4"
                                        name="email"
                                        readOnly
                                    />
                                    <textarea
                                        class="textarea textarea-bordered"
                                        placeholder="Enter your feelings about this ordered product"
                                        name='comment'
                                        required
                                    />
                                    <input
                                        type="number"
                                        class="input input-bordered w-full max-w-xs mb-4"
                                        placeholder="Enter your rating 1 to 5"
                                        name="rating"
                                        required

                                    />
                                    {ratingError && <p className='text-[red]'>{ratingError}</p> }
                                    <div
                                        className="card-actions justify-start"
                                    >
                                        <input
                                            type="submit"
                                            value="Add review"
                                            className='btn btn-primary w-full'
                                        />
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
    );
};

export default AddingReview;