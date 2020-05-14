import React, { useState } from 'react';
import Form from './Form';
import blogService from '../services/blogs';
import Togglable from './Togglable';

const BlogForm = ({ onClick, setMessage }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const blogFormRef = React.createRef();

  const handleCreateBlog = (e) => {
    e.preventDefault();

    const b = { title: title, author: author, url: url };

    blogService
      .create(b)
      .then((createdBlog) => {
        onClick(createdBlog);
        setMessage({
          message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
          color: 'green',
        });
        setTimeout(() => {
          setMessage({ message: '', color: 'grey' });
        }, 2500);
      })
      .catch((error) => {
        setMessage({ message: error.response.data.error, color: 'red' });
        setTimeout(() => {
          setMessage({ message: '', color: 'grey' });
        }, 2500);
      });
    blogFormRef.current.toggleVisibility();
  };

  return (
    <Togglable
      id='blogFormToggle'
      buttonShowLabel='new blog'
      buttonHideLabel='cancel'
      ref={blogFormRef}
    >
      <Form
        id='blogForm'
        onSubmit={handleCreateBlog}
        formName='Create new'
        inputs={[
          {
            id: 'title',
            label: 'title',
            type: 'text',
            value: '',
            name: 'Title',
            onChange: ({ target }) => setTitle(target.value),
          },
          {
            id: 'author',
            label: 'author',
            type: 'author',
            value: '',
            name: 'Author',
            onChange: ({ target }) => setAuthor(target.value),
          },
          {
            id: 'url',
            label: 'url',
            type: 'url',
            value: '',
            name: 'Url',
            onChange: ({ target }) => setUrl(target.value),
          },
        ]}
      />
    </Togglable>
  );
};

export default BlogForm;
