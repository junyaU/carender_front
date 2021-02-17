import React from 'react';
import { InputArea } from './UI/Input';
import { Button } from '@material-ui/core';
import { AuthContainer, AuthContainerType } from '../container/authContainer';
import { useContainer } from 'unstated-next';
import { login } from '../services/authService';

const HeadText: React.FC = React.memo(() => {
  return <h1>ログイン</h1>;
});

const LoginScreen: React.FC = () => {
  const authContainer: AuthContainerType = useContainer(AuthContainer);
  return (
    <div>
      <HeadText />
      <InputArea
        label="Email"
        error={authContainer.signUpErrorState.Email.error}
        helperText={authContainer.signUpErrorState.Email.message}
        onChange={(e: React.KeyboardEvent<HTMLInputElement>) => authContainer.handleEmailValue(e)}
        defaultValue={authContainer.signUpState.Email}
      />
      <InputArea
        label="Password"
        type="password"
        error={authContainer.signUpErrorState.Password.error}
        helperText={authContainer.signUpErrorState.Password.message}
        onChange={(e: React.KeyboardEvent<HTMLInputElement>) => authContainer.handlePasswordValue(e)}
        defaultValue={authContainer.signUpState.Password}
      />
      <Button variant="contained" color="primary" size="large" onClick={() => login(authContainer)}>
        ログイン
      </Button>
    </div>
  );
};

export default LoginScreen;
