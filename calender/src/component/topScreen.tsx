import React from 'react';
import { Button } from '@material-ui/core';
import '../styles/topScreen.css';

const TopScreen: React.FC = () => {
  return (
    <div>
      <h1 className="top-title">calender</h1>
      <div className="button-wrapper">
        <Button href="/signUp" variant="contained" color="primary" size="large">
          Sign Up
        </Button>
      </div>
      <div className="button-wrapper">
        <Button href="/login" variant="contained" color="primary" size="large">
          Log In
        </Button>
      </div>
    </div>
  );
};

export default TopScreen;
