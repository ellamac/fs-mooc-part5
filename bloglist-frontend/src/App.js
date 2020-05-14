import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Form from './components/Form';
import Button from './components/Button';
import BlogForm from './components/BlogForm';
import Blogs from './components/Blogs';
import Notification from './components/Notification';

const App = () => {
  const [newBlog, setNewBlog] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ message: '', color: 'black' });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      setUser(user);
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
      setMessage({
        message: `successfully logged in as ${user.name}`,
        color: 'green',
      });
      setTimeout(() => {
        setMessage({ message: '', color: 'grey' });
      }, 2500);
    } catch (exception) {
      setMessage({ message: 'wrong username or password', color: 'red' });
      setTimeout(() => {
        setMessage({ message: '', color: 'grey' });
      }, 2500);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    try {
      window.localStorage.clear();
      setUser(null);
      blogService.setToken('');
      setUsername('');
      setPassword('');
      setNewBlog({});
      setMessage({ message: 'successfully logged out', color: 'green' });
      setTimeout(() => {
        setMessage({ message: '', color: 'grey' });
      }, 2500);
    } catch (exception) {
      setMessage({
        message: 'something went wrong with logging out',
        color: 'red',
      });
      setTimeout(() => {
        setMessage({ message: '', color: 'grey' });
      }, 2500);
    }
  };

  const loginForm = () => (
    <Form
      id='loginForm'
      onSubmit={handleLogin}
      formName={'Login'}
      inputs={[
        {
          label: 'username',
          type: 'text',
          value: { username },
          name: 'Username',
          id: 'username',
          onChange: ({ target }) => setUsername(target.value),
        },
        {
          label: 'password',
          type: 'password',
          value: { password },
          name: 'Password',
          id: 'password',
          onChange: ({ target }) => setPassword(target.value),
        },
      ]}
    />
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification notif={message} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in{' '}
            <Button
              onClick={handleLogout}
              buttonText='log out'
              id='log-out-button'
            />
          </p>
          <BlogForm
            onClick={(blog) => setNewBlog(blog)}
            setMessage={(message) => setMessage(message)}
          />
          <Blogs newBlog={newBlog} loggedUser={user.username} />
        </div>
      )}
    </div>
  );
};

export default App;
