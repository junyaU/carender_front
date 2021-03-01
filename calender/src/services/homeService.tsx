import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { HomeContainerType } from '../container/homeContainer';
import axios, { AxiosResponse } from 'axios';

export type TokenType = {
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
  homeContainer.handleHomeModalInputToggle(true);
};

export const showScheduleDetailModal = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  homeContainer: HomeContainerType
) => {
  e.stopPropagation();
  homeContainer.handleScheduleDetailIdValue(Number(e.currentTarget.getAttribute('data-id')));
  homeContainer.handleScheduleDetailNameValue(String(e.currentTarget.getAttribute('data-name')));
  homeContainer.handleScheduleDetailYearValue(Number(e.currentTarget.getAttribute('data-year')));
  homeContainer.handleScheduleDetailMonthValue(Number(e.currentTarget.getAttribute('data-month')));
  homeContainer.handleScheduleDetailDayValue(Number(e.currentTarget.getAttribute('data-day')));
  homeContainer.handleScheduleDetailTimeValue(String(e.currentTarget.getAttribute('data-time')));
  homeContainer.handleHomeModalDetailToggle(true);
};

export const registerSchedule = async (homeContainer: HomeContainerType) => {
  const token: string | undefined = Cookies.get('calenderToken');
  if (!token) {
    window.location.href = '/';
    return;
  }
  if (!homeContainer.scheduleState.name) {
    homeContainer.handleScheduleNameError({ error: true, message: '１文字以上で入力してください' });
    return;
  } else {
    homeContainer.handleScheduleNameError({ error: false, message: '' });
  }
  if (!homeContainer.scheduleState.time) {
    alert('時間を選択してください');
    return;
  }
  if (!homeContainer.scheduleState.color) {
    alert('テーマカラーを選択してください');
    return;
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
    scheduledTime: homeContainer.scheduleState.time,
    color: homeContainer.scheduleState.color,
    token,
  };
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response: AxiosResponse = await axios.post(apiUrl, formData);
  if (!response.data) {
    alert('スケジュールの作成に失敗しました');
    return;
  }
  homeContainer.handleHomeModalInputToggle(false);
  homeContainer.handleScheduleTimeValue('');
  homeContainer.scheduleDispatch({ type: 'name', payload: { ...homeContainer.scheduleState, name: '' } });
  homeContainer.handleScheduleColorValue('');
  homeContainer.setFlag((prev) => !prev);
};

export const deleteSchedule = async (homeContainer: HomeContainerType) => {
  const token: string | undefined = Cookies.get('calenderToken');
  if (!token) {
    window.location.href = '/';
    return;
  }

  const deleteConfirm = window.confirm('この予定を削除しますか？');
  if (!deleteConfirm) return;

  const apiUrl: string = 'http://localhost:8080/deleteSchedule';
  const formData: FormData = new FormData();
  const data = {
    id: String(homeContainer.scheduleDetailState.id),
    token,
  };
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response: AxiosResponse = await axios.post(apiUrl, formData);
  if (!response.data) {
    alert('削除できませんでした');
    return;
  }
  homeContainer.handleHomeModalDetailToggle(false);
  homeContainer.setFlag((prev) => !prev);
};

export const closeInputModal = (homeContainer: HomeContainerType) => {
  homeContainer.handleHomeModalInputToggle(false);
  homeContainer.scheduleDispatch({ type: 'name', payload: { ...homeContainer.scheduleState, name: '' } });
  homeContainer.handleScheduleColorValue('');
  homeContainer.handleScheduleTimeValue('');
};

export const openScheduleModal = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  homeContainer: HomeContainerType,
  data: any,
  year: number,
  month: number,
  day: number
) => {
  e.stopPropagation();
  homeContainer.handleScheduleDetailYearValue(year);
  homeContainer.handleScheduleDetailMonthValue(month);
  homeContainer.handleScheduleDetailDayValue(day);
  homeContainer.setDayScheduleData(data);
  homeContainer.handleHomeModalScheduleToggle(true);
};

export const editSchedule = async (homeContainer: HomeContainerType) => {
  if (!homeContainer.scheduleDetailState.name) {
    homeContainer.handleScheduleNameError({ error: true, message: '１文字以上入力してください' });
    return;
  }

  const token: string | undefined = Cookies.get('calenderToken');
  if (!token) {
    window.location.href = '/';
    return;
  }

  const apiUrl: string = 'http://localhost:8080/editSchedule';
  const formData: FormData = new FormData();
  const data = {
    id: String(homeContainer.scheduleDetailState.id),
    name: homeContainer.scheduleDetailState.name,
    time: homeContainer.scheduleDetailState.time,
    token,
  };
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response: AxiosResponse = await axios.post(apiUrl, formData);
  if (!response.data) {
    alert('正常に更新できませんでした');
    return;
  }
  getScheduleData(homeContainer);
  homeContainer.handleHomeModalEditToggle(false);
};
