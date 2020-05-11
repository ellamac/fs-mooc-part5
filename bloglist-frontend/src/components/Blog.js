import React, { useState } from 'react';
import Togglable from './Togglable';
import blogService from '../services/blogs';

const Blog = ({ blog, loggedUser }) => {
  const [thisBlog, setThisBlog] = useState(blog);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    blogService
      .update({
        ...thisBlog,
        likes: thisBlog.likes + 1,
        user: thisBlog.user.id,
      })
      .then((updatedBlog) =>
        setThisBlog({ ...thisBlog, likes: updatedBlog.likes })
      );
  };

  const handleRemove = () => {
    if (
      window.confirm(`Remove blog ${thisBlog.title} by ${thisBlog.author}?`)
    ) {
      try {
        blogService.remove(thisBlog.id).then(() => setThisBlog(null));
      } catch (error) {
        console.log('Removing did not work', error);
      }
    }
  };

  return thisBlog ? (
    <div style={blogStyle}>
      {thisBlog.title} {thisBlog.author}
      <Togglable buttonShowLabel='view' buttonHideLabel='hide'>
        <div>{thisBlog.url}</div>
        <div>
          {thisBlog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>{thisBlog.user.name}</div>
        {loggedUser === thisBlog.user.username ? (
          <button onClick={handleRemove}>remove</button>
        ) : (
          <></>
        )}
      </Togglable>
    </div>
  ) : (
    <></>
  );
};

export default Blog;
