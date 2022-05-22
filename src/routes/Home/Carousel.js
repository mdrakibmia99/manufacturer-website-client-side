import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import useCarousels from '../../hooks/useCarousels';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    const [carousels] = useCarousels();
    return (
        <div className='bg-gray-200'>
            <div className=''>
                <Carousel showArrows={true} autoPlay>
                    {
                        carousels.map(carousel => <div
                            key={carousel?._id}
                        >
                            <img src={carousel?.sliderImage} alt="hammer-carousel" />
                            <p className='legend'>{carousel?.sliderDescription}</p>
                        </div>)
                    }
                </Carousel>
            </div>
        </div>
    );
};

export default Banner;