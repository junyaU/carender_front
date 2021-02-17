import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { HomeContainerType } from '../container/homeContainer';
import axios, { AxiosResponse } from 'axios';

type TokenType = {
  sub: string;
  name: string;
  iss: string;
};

export const getScheduleData = async (homeContainer: HomeContainerType) => {
  const token: string | undefined = Cookies.get('calenderToken');
  if (!token) {
    window.location.href = '/';
    return;
  }

  const decodeToken: TokenType = jwtDecode(token);
  const apiUrl: string = `http://localhost:8080/getScheduleData/${decodeToken.sub}`;
  const response: AxiosResponse = await axios.get(apiUrl);
  if (response.data) {
    homeContainer.setScheduleData(response.data);
  }
};

export const showInputModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, homeContainer: HomeContainerType) => {
  homeContainer.handleYearValue(Number(e.currentTarget.getAttribute('data-year')));
  homeContainer.handleMonthValue(Number(e.currentTarget.getAttribute('data-month')));
  homeContainer.handleDateValue(Number(e.currentTarget.getAttribute('data-day')));
  homeContainer.setmodalShowValue(true);
};

export const registerSchedule = async (homeContainer: HomeContainerType) => {
  const token: string | undefined = Cookies.get('calenderToken');
  if (!token) {
    window.location.href = '/';
    return;
  }

  if (!homeContainer.scheduleState.name || homeContainer.scheduleState.name.length > 6) {
    homeContainer.handleScheduleNameError({ error: true, message: '１文字以上6文字以下で入力してください' });
    return;
  } else {
    homeContainer.handleScheduleNameError({ error: false, message: '' });
  }

  const decodeToken: TokenType = jwtDecode(token);
  const apiUrl: string = 'http://localhost:8080/registerSchedule';
  const formData: FormData = new FormData();
  const data = {
    id: decodeToken.sub,
    name: homeContainer.scheduleState.name,
    year: String(homeContainer.dayState.year),
    month: String(homeContainer.dayState.month),
    day: String(homeContainer.dayState.date),
    scheduledTime: '12:00',
  };
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response: AxiosResponse = await axios.post(apiUrl, formData);
  if (!response.data) {
    alert('スケジュールの作成に失敗しました');
    return;
  }
  homeContainer.setmodalShowValue(false);
};
