
import useCarousels from '../../hooks/useCarousels';
import Reviews from './Reviews';
import Tools from './Tools';



const Home = () => {
    const [carousels] = useCarousels();
    const nextSliderPoint=["#slide4","#slide1","#slide2","#slide3"];
    const previousSliderPoint=["#slide2","#slide3","#slide4","#slide1"];

   
    return (
        <div>
            <div className='container mx-auto'>
                <div className="carousel w-full overflow-hidden">
                    {
                        carousels.map((carousel,index) => <div
                           
                            id={`slide${index+1}`}
                            className="carousel-item relative w-full"
                            key={carousel._id}
                        >
                            <img src={carousel.sliderImage} className="w-full h-screen" alt='' />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href={`${nextSliderPoint[index]}`} className="btn btn-circle">❮</a>
                                <a href={`${previousSliderPoint[index]}`} className="btn btn-circle">❯</a>
                            </div>
                        </div>
                        )}
                </div>
            </div>

            {/* product tools set */}
            <Tools></Tools>

            {/* reviews  */}
            <Reviews></Reviews>

            {/* products review  */}


            
        </div>


    );
};

export default Home;