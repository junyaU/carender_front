import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import TopScreen from './component/topScreen';
import SignUpScreen from './component/signUpScreen';
import LoginScreen from './component/loginScreen';
import HomeScreen from './component/homeScreen';
import { AuthContainer } from './container/authContainer';
import { HomeContainer } from './container/homeContainer';
import Cookies from 'js-cookie';

const App = () => {
  const initialRootName = Cookies.get('calenderToken') ? '/home' : '/top';
  return (
    <div className="App">
      <AuthContainer.Provider>
        <HomeContainer.Provider>
          <BrowserRouter>
            <div>
              <Route
                path="/"
                exact
                render={() => {
                  return <Redirect to={initialRootName} />;
                }}
              />
              <Route path="/top" component={TopScreen} />
              <Route path="/signUp" component={SignUpScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/home" component={HomeScreen} />
            </div>
          </BrowserRouter>
        </HomeContainer.Provider>
      </AuthContainer.Provider>
    </div>
  );
};

export default App;
