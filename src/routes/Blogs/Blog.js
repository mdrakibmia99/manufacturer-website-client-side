import React from 'react';
import PageTitle from '../../shared/PageTitle';

const Blog = ({ index, blog }) => {
    const { question, answer } = blog
    return (
        <div tabIndex="0" className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
            <PageTitle title={'Blogs'} />
            <div className="collapse-title text-xl font-medium">
                <span className='text-green-600'>{index + 1}</span>. {question}
            </div>
            <div className="collapse-content">
                <p className='text-secondary'>{answer}</p>
            </div>
        </div>
    );
};

export default Blog;