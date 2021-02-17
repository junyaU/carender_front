import { createContainer } from 'unstated-next';
import { useReducer } from 'react';

type SignUpState = {
  Name: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
};

type SignUpAction = {
  type: SignUpActionTypes;
  payload: SignUpState;
};

const SignUpActionType = {
  Name: 'Name',
  Email: 'Email',
  Password: 'Password',
  ConfirmPassword: 'ConfirmPassword',
} as const;
type SignUpActionTypes = typeof SignUpActionType[keyof typeof SignUpActionType];

type SignUpErrorState = {
  Name: { error: boolean; message: string };
  Email: { error: boolean; message: string };
  Password: { error: boolean; message: string };
  ConfirmPassword: { error: boolean; message: string };
};

type SignUpErrorAction = {
  type: SignUpErrorActionTypes;
  payload: SignUpErrorState;
};

const SignUpErrorActionType = {
  Name: 'Name',
  Email: 'Email',
  Password: 'Password',
  ConfirmPassword: 'ConfirmPassword',
} as const;
type SignUpErrorActionTypes = typeof SignUpErrorActionType[keyof typeof SignUpErrorActionType];

const Auth = () => {
  const signUpInitialState = {
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  };

  const signUpErrorInitialState = {
    Name: { error: false, message: '' },
    Email: { error: false, message: '' },
    Password: { error: false, message: '' },
    ConfirmPassword: { error: false, message: '' },
  };

  const SignUpReducer: React.Reducer<SignUpState, SignUpAction> = (state, action) => {
    switch (action.type) {
      case SignUpActionType.Name:
        return { ...state, Name: action.payload.Name };
      case SignUpActionType.Email:
        return { ...state, Email: action.payload.Email };
      case SignUpActionType.Password:
        return { ...state, Password: action.payload.Password };
      case SignUpActionType.ConfirmPassword:
        return { ...state, ConfirmPassword: action.payload.ConfirmPassword };
    }
  };

  const SignUpErrorReducer: React.Reducer<SignUpErrorState, SignUpErrorAction> = (state, action) => {
    switch (action.type) {
      case SignUpErrorActionType.Name:
        return { ...state, Name: action.payload.Name };
      case SignUpErrorActionType.Email:
        return { ...state, Email: action.payload.Email };
      case SignUpErrorActionType.Password:
        return { ...state, Password: action.payload.Password };
      case SignUpErrorActionType.ConfirmPassword:
        return { ...state, ConfirmPassword: action.payload.ConfirmPassword };
    }
  };

  const [signUpState, signUpDispatch] = useReducer(SignUpReducer, signUpInitialState);
  const [signUpErrorState, signUpErrorDispatch] = useReducer(SignUpErrorReducer, signUpErrorInitialState);

  const handleNameValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    signUpDispatch({ type: SignUpActionType.Name, payload: { ...signUpState, Name: e.currentTarget.value } });
  };

  const handleEmailValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    signUpDispatch({ type: SignUpActionType.Email, payload: { ...signUpState, Email: e.currentTarget.value } });
  };

  const handlePasswordValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    signUpDispatch({ type: SignUpActionType.Password, payload: { ...signUpState, Password: e.currentTarget.value } });
  };

  const handleConfirmPasswordValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    signUpDispatch({
      type: SignUpActionType.ConfirmPassword,
      payload: { ...signUpState, ConfirmPassword: e.currentTarget.value },
    });
  };

  const handleNameError = (value: { error: boolean; message: string }) => {
    signUpErrorDispatch({
      type: SignUpErrorActionType.Name,
      payload: { ...signUpErrorState, Name: { error: value.error, message: value.message } },
    });
  };

  const handleEmailError = (value: { error: boolean; message: string }) => {
    signUpErrorDispatch({
      type: SignUpErrorActionType.Email,
      payload: { ...signUpErrorState, Email: { error: value.error, message: value.message } },
    });
  };
  const handlePasswordError = (value: { error: boolean; message: string }) => {
    signUpErrorDispatch({
      type: SignUpErrorActionType.Password,
      payload: { ...signUpErrorState, Password: { error: value.error, message: value.message } },
    });
  };
  const handleConfirmPasswordError = (value: { error: boolean; message: string }) => {
    signUpErrorDispatch({
      type: SignUpErrorActionType.ConfirmPassword,
      payload: { ...signUpErrorState, ConfirmPassword: { error: value.error, message: value.message } },
    });
  };

  return {
    signUpState,
    signUpErrorState,
    handleNameValue,
    handleEmailValue,
    handlePasswordValue,
    handleConfirmPasswordValue,
    handleNameError,
    handleEmailError,
    handlePasswordError,
    handleConfirmPasswordError,
  };
};
export const AuthContainer = createContainer(Auth);

export type AuthContainerType = {
  signUpState: SignUpState;
  signUpErrorState: SignUpErrorState;
  handleNameValue: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleEmailValue: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handlePasswordValue: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleConfirmPasswordValue: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleNameError: (value: { error: boolean; message: string }) => void;
  handleEmailError: (value: { error: boolean; message: string }) => void;
  handlePasswordError: (value: { error: boolean; message: string }) => void;
  handleConfirmPasswordError: (value: { error: boolean; message: string }) => void;
};
