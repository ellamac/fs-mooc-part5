import React, { useEffect, useState } from 'react';
import blogService from '../services/blogs';

const Blogs = ({ newBlog }) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        getUserBlogs()
    }, [newBlog])

    const getUserBlogs = () => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    };

    const mapBlogs = () => {
        return blogs.map((blog) => <div key={blog.id}>
            {blog.title} {blog.author}
        </div>);
    };

    return (
        <>
            {mapBlogs()}
            {/* {newBlog
                ? <div key={newBlog.id}>
                    {newBlog.title} {newBlog.author}
                </div>
                : null} */}
        </>
    );
};

export default Blogs;