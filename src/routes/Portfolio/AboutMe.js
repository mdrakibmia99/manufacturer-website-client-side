import React from 'react';

const AboutMe = () => {
    return (
        <div className='min-h-screen bg-zinc-800  w-full flex justify-center items-center'>
          <div className='w-full'>

          <div className='flex justify-center'>
             <h2 className='text-5xl mt-5 p-1 border-t-[orange] border-l-[orange] border-b-white border-r-white text-center text-white border-4'>About Me</h2>
           </div>

             <div className='lg:w-1/3 w-full mx-auto text-xl text-center  mt-10'>
                <p className='mt-3 text-white'>Name: <span className='text-[orange]'> Md Rakib Mia</span></p>
                <p className='mt-3 text-white'>Age: <span className='text-[orange]'>21</span></p>
                <p className='mt-3 text-white'>Qualification: <span className='text-[orange]'> B.Sc in CSE</span></p>
                <p className='mt-3 text-white'>Post: <span className='text-[orange]'>MERN Stack Developer</span></p>
                <p className='mt-3 text-white'>Language: <span className='text-[orange]'>Bangla ,English</span></p>
             <a href="https://drive.google.com/file/d/11efNCXU8MFW-HFXUV2GGSz6YVY-Yopbi/view?usp=sharing" target={'_blank'} className="btn mt-5 border-2
              border-[orange] px-5"> Resume</a>
             </div>
          </div>

            
        
          
          </div>
    );
};

export default AboutMe;