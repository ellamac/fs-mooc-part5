import React, { useEffect, useState } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';

const Blogs = ({ newBlog, loggedUser }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getUserBlogs();
  }, [newBlog]);

  /*  const sortByLikes = (items) => {
    items.sort(function (a, b) {
      return a.likes - b.likes;
    });
  }; */

  const getUserBlogs = () => {
    blogService.getAll().then((blogs) =>
      setBlogs(
        blogs.sort(function (a, b) {
          return b.likes - a.likes;
        })
      )
    );
  };

  const mapBlogs = () => {
    return blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} loggedUser={loggedUser} />
    ));
  };

  return <>{mapBlogs()}</>;
};

export default Blogs;
