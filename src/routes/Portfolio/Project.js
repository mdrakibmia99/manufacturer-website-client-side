import React from 'react';

const Project = () => {
    return (
        <div className='h-full bg-zinc-800'>
            <div className='flex justify-center'>
                <h2 className='text-5xl mt-5 p-1 border-t-[orange] border-l-[orange] border-b-white border-r-white text-center text-white border-4'>Project</h2>
            </div>
           
           <div className='grid grid-cols-1 lg:grid-cols-3 mt-5 gap-5 '>
           <div className='shadow-lg'>
               

                <a href="https://i.ibb.co/zsXYNf2/ware-house-mangemnet.jpg
https://i.ibb.co/wrnhdfZ/independent.jpg
https://i.ibb.co/LZd51dX/hexisol-review.jpg" target="_blank" className='border-2 border-[orange] mr-3 text-white btn' rel="">Image LInk</a>
                <a href="https://warehouse-management-web-3fc33.web.app/" target="_blank"  className='border-2 border-[orange] mr-3 text-white btn' rel=""> live Site </a>
                <img src="https://i.ibb.co/zsXYNf2/ware-house-mangemnet.jpg
https://i.ibb.co/wrnhdfZ/independent.jpg
https://i.ibb.co/LZd51dX/hexisol-review.jpg" className='my-5' alt="" />

            </div>
            <div className='shadow-lg'>
                
                <a href="https://i.ibb.co/wrnhdfZ/independent.jpg" target="_blank" className="border-2 border-[orange] mr-3 btn text-white" rel="noopener noreferrer">Img Link</a>
                <a href="https://independent-service-prov-15a1e.web.app/" className='border-2 border-[orange] mr-3 text-white btn'  target="_blank" rel="noopener noreferrer"> Live SIte</a>
                <img src="https://i.ibb.co/wrnhdfZ/independent.jpg" className='my-5'  alt="" />
            </div>
            <div className='shadow-lg'>
               
                <a href="https://i.ibb.co/LZd51dX/hexisol-review.jpg" className='border-2 border-[orange] mr-3 text-white btn' target="_blank" rel="noopener noreferrer">Image Link</a>
                <a href="https://i.ibb.co/LZd51dX/hexisol-review.jpg" target="_blank" rel="noopener noreferrer" className="border-2 border-[orange] mr-3  btn">Live Site</a>
                <img src="https://i.ibb.co/LZd51dX/hexisol-review.jpg" className='my-5' alt="" />
            </div>
           </div>
        </div>
    );
};

export default Project;