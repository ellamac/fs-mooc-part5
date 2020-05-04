import React, { useState, useEffect } from 'react';
import Form from './Form';
import blogService from '../services/blogs';

const BlogForm = ({ onClick, setMessage }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [blog, setBlog] = useState({ title: '', author: '', url: '' });

  const handleCreateBlog = (e) => {
    e.preventDefault();

    const b = { title: title, author: author, url: url }

    blogService.create(b)
      .then(createdBlog => {
        onClick(createdBlog);
        setMessage({ message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`, color: "green" });
        setTimeout(() => {
          setMessage({ message: '', color: "grey" })
        }, 2500);
      })
      .catch(error => {
        setMessage({ message: error.response.data.error, color: "red" });
        setTimeout(() => {
          setMessage({ message: '', color: "grey" })
        }, 2500);
      });
  };

  return (
    <div>
      <Form
        onSubmit={handleCreateBlog}
        formName='Create New'
        inputs={[
          {
            label: 'title',
            type: 'text',
            value: '',
            name: 'Title',
            onChange: ({ target }) => setTitle(target.value),
          },
          {
            label: 'author',
            type: 'author',
            value: '',
            name: 'Author',
            onChange: ({ target }) => setAuthor(target.value),
          },
          {
            label: 'url',
            type: 'url',
            value: '',
            name: 'Url',
            onChange: ({ target }) => setUrl(target.value),
          },
        ]}
      />
    </div>
  );
};

export default BlogForm;
