

import PageTitle from '../../shared/PageTitle';
import Reviews from './Reviews';
import Tools from './Tools';



const Home = () => {



    return (
        <div>
            <PageTitle title={'Home'} />
            <div className='container mx-auto'>

                <div className="carousel w-full overflow-hidden">

                    <div className="carousel-item relative w-full max-h-screen">
                       
                        <img src={"https://i.ibb.co/PrjNS40/hammer-girl.jpg"} className="w-full h-screen" alt='' />

                    </div>

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