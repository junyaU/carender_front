import React from 'react';
import { Button } from '@material-ui/core';
import '../../styles/signUp.css';
import { AuthContainer, AuthContainerType } from '../../container/authContainer';
import { useContainer } from 'unstated-next';
import { createUser } from '../../services/authService';
import { InputArea } from '../UI/Input';

const HeadText = React.memo(() => {
  return <h1>サインアップ</h1>;
});

const SignUpScreen: React.FC = () => {
  const authContainer: AuthContainerType = useContainer(AuthContainer);

  return (
    <div>
      <HeadText />
      <InputArea
        label="Name"
        onChange={(e: React.KeyboardEvent<HTMLInputElement>) => authContainer.handleNameValue(e)}
        error={authContainer.signUpErrorState.Name.error}
        helperText={authContainer.signUpErrorState.Name.message}
        defaultValue={authContainer.signUpState.Name}
      />
      <InputArea
        label="Email"
        onChange={(e: React.KeyboardEvent<HTMLInputElement>) => authContainer.handleEmailValue(e)}
        error={authContainer.signUpErrorState.Email.error}
        helperText={authContainer.signUpErrorState.Email.message}
        defaultValue={authContainer.signUpState.Email}
      />
      <InputArea
        label="Password"
        type="password"
        onChange={(e: React.KeyboardEvent<HTMLInputElement>) => authContainer.handlePasswordValue(e)}
        error={authContainer.signUpErrorState.Password.error}
        helperText={authContainer.signUpErrorState.Password.message}
        defaultValue={authContainer.signUpState.Password}
      />
      <InputArea
        label="Confirm Password"
        type="password"
        onChange={(e: React.KeyboardEvent<HTMLInputElement>) => authContainer.handleConfirmPasswordValue(e)}
        error={authContainer.signUpErrorState.ConfirmPassword.error}
        helperText={authContainer.signUpErrorState.ConfirmPassword.message}
        defaultValue={authContainer.signUpState.ConfirmPassword}
      />
      <Button variant="contained" color="primary" size="large" onClick={() => createUser(authContainer)}>
        送信
      </Button>
    </div>
  );
};

export default SignUpScreen;
