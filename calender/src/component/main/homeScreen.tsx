import React, { useEffect } from 'react';
import { logout } from '../../services/authService';
import { getScheduleData, TokenType } from '../../services/homeService';
import '../../styles/home.css';
import { Button } from '@material-ui/core';
import { HomeContainer, HomeContainerType } from '../../container/homeContainer';
import { useContainer } from 'unstated-next';
import Calender from './calender';
import { InputModal, ScheduleModal, ScheduleDetailModal, ScheduleEditModal } from './modals';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const ButtonArea: React.FC<{ homeContainer: HomeContainerType }> = React.memo(({ homeContainer }) => {
  return (
    <div className="change-button-wrapper">
      <Button
        className="button"
        variant="contained"
        color="primary"
        size="large"
        onClick={() => homeContainer.decreaseMon()}
      >
        前の月
      </Button>
      <Button
        className="button"
        variant="contained"
        color="primary"
        size="large"
        onClick={() => homeContainer.increaseMon()}
      >
        次の月
      </Button>
    </div>
  );
});

const UserArea: React.FC = () => {
  const token = String(Cookies.get('calenderToken'));
  const parseToken: TokenType = jwtDecode(token);
  return (
    <div className="user-area">
      <Button className="button" variant="contained" color="inherit" size="large" onClick={() => logout()}>
        ログアウト
      </Button>
      <p className="user-name">{parseToken.name}</p>
    </div>
  );
};

const HomeScreen: React.FC = () => {
  const homeContainer: HomeContainerType = useContainer(HomeContainer);
  useEffect(() => {
    getScheduleData(homeContainer);
  }, [homeContainer.getDataFlag]);
  return (
    <div>
      <UserArea />
      <Calender homeContainer={homeContainer} />
      <ButtonArea homeContainer={homeContainer} />
      <InputModal homeContainer={homeContainer} />
      <ScheduleModal homeContainer={homeContainer} />
      <ScheduleDetailModal homeContainer={homeContainer} />
      <ScheduleEditModal homeContainer={homeContainer} />
    </div>
  );
};

export default HomeScreen;
