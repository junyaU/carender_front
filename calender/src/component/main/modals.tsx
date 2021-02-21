import React from 'react';
import { registerSchedule, deleteSchedule, closeInputModal, editSchedule } from '../../services/homeService';
import '../../styles/home.css';
import { Button, Modal } from '@material-ui/core';
import Select from 'react-select';
import { HomeContainerType } from '../../container/homeContainer';
import { InputArea } from '../UI/Input';
import { timeData } from '../../data/timeData';
import { ScheduleDataType } from './calender';

export const InputModal: React.FC<{ homeContainer: HomeContainerType }> = React.memo(({ homeContainer }) => {
  const times = timeData();
  const colorData = [
    {
      className: 'color-circle color-default',
      dataColor: '#dcdcdc',
      choiced: homeContainer.scheduleState.color === '#dcdcdc' ? 'solid 3px #aaaaaa' : '',
    },
    {
      className: 'color-circle color-red',
      dataColor: '#ff6600',
      choiced: homeContainer.scheduleState.color === '#ff6600' ? 'solid 3px #ff3333' : '',
    },
    {
      className: 'color-circle color-blue',
      dataColor: '#0099ff',
      choiced: homeContainer.scheduleState.color === '#0099ff' ? 'solid 3px #0033cc' : '',
    },
  ];

  return (
    <Modal
      open={homeContainer.homeModalToggleState.input}
      onClose={() => closeInputModal(homeContainer)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-content-wrapper">
        <h2>
          {homeContainer.dayState.year}年{homeContainer.dayState.month}月{homeContainer.dayState.date}日に予定を追加
        </h2>
        <InputArea
          label="スケジュール名"
          error={homeContainer.scheduleErrorState.name.error}
          helperText={homeContainer.scheduleErrorState.name.message}
          onChange={(e: React.KeyboardEvent<HTMLInputElement>) => homeContainer.handleScheduleNameValue(e)}
          defaultValue={homeContainer.scheduleState.name}
        />
        <Select
          placeholder="予定時間..."
          options={times}
          onChange={(item: any) => homeContainer.handleScheduleTimeValue(item.value)}
          className="select-input"
        />
        <h4 className="color-select-text">テーマカラー</h4>
        <div className="color-select-wrapper">
          {colorData.map((item, i) => (
            <p
              className={item.className}
              data-color={item.dataColor}
              onClick={(e) =>
                homeContainer.handleScheduleColorValue(String(e.currentTarget.getAttribute('data-color')))
              }
              style={{ border: item.choiced }}
            ></p>
          ))}
        </div>
        <Button
          className="button"
          variant="contained"
          color="primary"
          size="large"
          onClick={() => registerSchedule(homeContainer)}
        >
          登録
        </Button>
      </div>
    </Modal>
  );
});

export const ScheduleModal: React.FC<{ homeContainer: HomeContainerType }> = ({ homeContainer }) => {
  return (
    <Modal
      open={homeContainer.homeModalToggleState.schedule}
      onClose={() => homeContainer.handleHomeModalScheduleToggle(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-content-wrapper">
        <h3>
          {homeContainer.scheduleDetailState.year}年{homeContainer.scheduleDetailState.month}月
          {homeContainer.scheduleDetailState.day}日のスケジュール
        </h3>
        <div>
          {homeContainer.dayScheduleData.map((data: ScheduleDataType, i) => (
            <div key={i} className="day-schedule-wrapper" style={{ backgroundColor: data.Color }}>
              <p className="time-text">{data.ScheduleTime}</p>
              <h4>{data.Name}</h4>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export const ScheduleDetailModal: React.FC<{ homeContainer: HomeContainerType }> = ({ homeContainer }) => {
  return (
    <Modal
      open={homeContainer.homeModalToggleState.detail}
      onClose={() => homeContainer.handleHomeModalDetailToggle(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-content-wrapper">
        <h3>
          {homeContainer.scheduleDetailState.year}年{homeContainer.scheduleDetailState.month}月
          {homeContainer.scheduleDetailState.day}日
        </h3>
        <p>{homeContainer.scheduleDetailState.time}</p>
        <h2>{homeContainer.scheduleDetailState.name}</h2>
        <div className="schedule-button-wrapper">
          <Button
            className="button"
            variant="contained"
            color="inherit"
            size="large"
            onClick={() => homeContainer.handleHomeModalEditToggle(true)}
          >
            編集
          </Button>
          <Button
            className="button"
            variant="outlined"
            color="secondary"
            size="large"
            onClick={() => deleteSchedule(homeContainer)}
          >
            削除
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export const ScheduleEditModal: React.FC<{ homeContainer: HomeContainerType }> = ({ homeContainer }) => {
  const times = timeData();
  return (
    <Modal
      open={homeContainer.homeModalToggleState.edit}
      onClose={() => homeContainer.handleHomeModalEditToggle(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-content-wrapper">
        <h4>スケジュール編集</h4>
        <InputArea
          label="スケジュール名"
          defaultValue={homeContainer.scheduleDetailState.name}
          error={homeContainer.scheduleErrorState.name.error}
          helperText={homeContainer.scheduleErrorState.name.message}
          onChange={(e: React.KeyboardEvent<HTMLInputElement>) =>
            homeContainer.handleScheduleDetailNameValue(e.currentTarget.value)
          }
        />
        <Select
          placeholder="予定時間..."
          options={times}
          onChange={(item: any) => homeContainer.handleScheduleDetailTimeValue(item.value)}
          className="select-input"
          defaultValue={times.filter((data) => data.value === homeContainer.scheduleDetailState.time)}
        />
        <Button
          className="button"
          variant="contained"
          color="primary"
          size="large"
          onClick={() => editSchedule(homeContainer)}
        >
          登録
        </Button>
      </div>
    </Modal>
  );
};
