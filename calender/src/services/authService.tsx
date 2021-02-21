import { AuthContainerType } from '../container/authContainer';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export const createUser = async (authContainer: AuthContainerType) => {
  if (authContainer.signUpState.Name.length < 4 || authContainer.signUpState.Name.length > 10) {
    authContainer.handleNameError({ error: true, message: '4文字以上10文字以下入力してください' });
    return;
  } else {
    authContainer.handleNameError({ error: false, message: '' });
  }

  const emailCheck = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  const emailExistCheckApiUrl: string = `http://localhost:8080/emailCheck/${authContainer.signUpState.Email}`;
  const emailResponse: AxiosResponse = await axios.get(emailExistCheckApiUrl);
  if (!authContainer.signUpState.Email.match(emailCheck)) {
    authContainer.handleEmailError({ error: true, message: 'メールアドレスの形式で入力してください' });
    return;
  } else if (!emailResponse.data) {
    authContainer.handleEmailError({ error: true, message: 'このメールアドレスは既に使われています' });
    return;
  } else {
    authContainer.handleEmailError({ error: false, message: '' });
  }

  const halfSizeCheck = /^[0-9a-z]+$/;
  if (authContainer.signUpState.Password.length < 8 || authContainer.signUpState.Password.length > 12) {
    authContainer.handlePasswordError({ error: true, message: '8文字以上12文字以下で入力してください' });
    return;
  } else if (!authContainer.signUpState.Password.match(halfSizeCheck)) {
    authContainer.handlePasswordError({ error: true, message: '半角文字で入力してください' });
    return;
  } else {
    authContainer.handlePasswordError({ error: false, message: '' });
  }

  if (authContainer.signUpState.Password !== authContainer.signUpState.ConfirmPassword) {
    authContainer.handleConfirmPasswordError({ error: true, message: 'パスワードが一致していません' });
    return;
  } else {
    authContainer.handleConfirmPasswordError({ error: false, message: '' });
  }

  const apiUrl: string = 'http://localhost:8080/createUser';
  const formData: FormData = new FormData();
  const data = {
    name: authContainer.signUpState.Name,
    email: authContainer.signUpState.Email,
    password: authContainer.signUpState.Password,
  };
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response: AxiosResponse = await axios.post(apiUrl, formData);
  if (!response.data) {
    alert('ユーザー登録に失敗しました');
    return;
  }

  Cookies.set('calenderToken', response.data);
  window.location.href = '/home';
};

export const login = async (authContainer: AuthContainerType) => {
  const emailCheck = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  if (!authContainer.signUpState.Email.match(emailCheck)) {
    authContainer.handleEmailError({ error: true, message: 'メールアドレスの形式で入力してください' });
    return;
  } else {
    authContainer.handleEmailError({ error: false, message: '' });
  }

  const halfSizeCheck = /^[0-9a-z]+$/;
  if (authContainer.signUpState.Password.length < 8 || authContainer.signUpState.Password.length > 12) {
    authContainer.handlePasswordError({ error: true, message: '8文字以上12文字以下で入力してください' });
    return;
  } else if (!authContainer.signUpState.Password.match(halfSizeCheck)) {
    authContainer.handlePasswordError({ error: true, message: '半角文字で入力してください' });
    return;
  } else {
    authContainer.handlePasswordError({ error: false, message: '' });
  }

  const apiUrl: string = 'http://localhost:8080/login';
  const formData: FormData = new FormData();
  const data = {
    email: authContainer.signUpState.Email,
    password: authContainer.signUpState.Password,
  };
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response: AxiosResponse = await axios.post(apiUrl, formData);
  if (!response.data) {
    alert('ログインに失敗しました');
    return;
  }
  Cookies.set('calenderToken', response.data);
  window.location.href = '/home';
};

export const logout = () => {
  Cookies.remove('calenderToken');
  window.location.href = '/';
};
