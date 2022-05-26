import React from 'react';
import PageTitle from '../../shared/PageTitle';

const Technology = () => {
    return (
        <div className='min-h-screen bg-zinc-800  w-full flex justify-center items-center'>
          <PageTitle title={'Technology'} />
        <div className='w-full'>

        <div className='flex justify-center'>
           <h2 className='text-5xl mt-5 p-1 border-t-[orange] border-l-[orange] border-b-white border-r-white text-center text-white border-4'>Technology</h2>
         </div>

           <div className='lg:w-1/3 w-full mx-auto text-xl text-start  mt-10'>
              <p className='mt-3 text-white'>Font-end: <span className='text-[orange]'>Html,CSS,JavaScript,Bootstrap,Tailwind,React</span></p>
              <p className='mt-3 text-white'>Back-end: <span className='text-[orange]'>NodeJs,Express,Mongodb,firebase,Netlify,github</span></p>
           </div>
        </div>
        </div>
    );
};

export default Technology;