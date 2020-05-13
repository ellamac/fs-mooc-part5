import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} buttonText={props.buttonShowLabel} />
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <Button onClick={toggleVisibility} buttonText={props.buttonHideLabel} />
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonShowLabel: PropTypes.string.isRequired,
  buttonHideLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
