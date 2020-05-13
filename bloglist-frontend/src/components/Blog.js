import React, { useState } from 'react';
import Togglable from './Togglable';
import Button from './Button';
import blogService from '../services/blogs';
import '../App.css';

const Blog = ({ blog, loggedUser }) => {
  const [thisBlog, setThisBlog] = useState(blog);

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
    <div className='blog'>
      {thisBlog.title} {thisBlog.author}
      <Togglable buttonShowLabel='view' buttonHideLabel='hide'>
        <div>{thisBlog.url}</div>
        <div>
          {thisBlog.likes}
          <Button onClick={handleLike} buttonText='like' />
        </div>
        <div>{thisBlog.user.name}</div>
        {loggedUser === thisBlog.user.username ? (
          <Button onClick={handleRemove} buttonText='remove' />
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
