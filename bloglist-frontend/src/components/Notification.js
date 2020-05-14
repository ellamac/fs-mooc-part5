import React from 'react';

const Notification = ({ notif }) => {
  const errorStyle = {
    color: notif.color,
    backgroundColor: 'lightgrey',
    border: 'solid 3px',
    borderColor: notif.color,
    borderRadius: 5,
    padding: 10,
    margin: '10px 0',
  };

  if (notif.message === '') {
    return null;
  }

  return (
    <div style={errorStyle} id='notification'>
      {notif.message}
    </div>
  );
};

export default Notification;
