import React from 'react';
import PageTitle from '../../shared/PageTitle';

const Education = () => {
    return (
        <div className='min-h-screen bg-zinc-800  w-full flex justify-center items-center'>
           <PageTitle title={'Education'} />
          <div className='w-full'>

          <div className='flex justify-center'>
             <h2 className='text-5xl mt-5 p-1 border-t-[orange] border-l-[orange] border-b-white border-r-white text-center text-white border-4'>Education</h2>
           </div>

             <div className='lg:w-1/3 w-full mx-auto text-xl text-start  mt-10'>
                <p className='mt-3 text-white'>SSC: <span className='text-[orange]'>Tangail Shaheen School (2017)</span></p>
                <p className='mt-3 text-white'>HSC: <span className='text-[orange]'>Bepza Public School & College(2019)</span></p>
                <p className='mt-3 text-white'>University: <span className='text-[orange]'>City University (continue)</span></p>
             <a href="https://drive.google.com/file/d/11efNCXU8MFW-HFXUV2GGSz6YVY-Yopbi/view?usp=sharing" target={'_blank'} className="btn mt-5 border-2
              border-[orange] px-5"> Resume</a>
             </div>
          </div>
          </div>
    );
};

export default Education;