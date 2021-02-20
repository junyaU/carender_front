import React, { useEffect } from 'react';
import {
  getScheduleData,
  showInputModal,
  registerSchedule,
  showScheduleDetailModal,
  deleteSchedule,
  closeInputModal,
  openScheduleModal,
  editSchedule,
} from '../services/homeService';
import '../styles/home.css';
import { Button, Modal } from '@material-ui/core';
import Select from 'react-select';
import { HomeContainer, HomeContainerType } from '../container/homeContainer';
import { useContainer } from 'unstated-next';
import { InputArea } from './UI/Input';
import { timeData } from '../data/timeData';

type ScheduleDataType = {
  Id: number;
  Name: string;
  Year: string;
  Month: string;
  Day: string;
  ScheduleTime: StaticRange;
  Color: string;
};

type CalenderDayType = {
  year: number;
  month: number;
  day: number;
  week: string;
  data: any[];
};

const Calender: React.FC<{ homeContainer: HomeContainerType }> = React.memo(({ homeContainer }) => {
  const weeks = ['日', '月', '火', '水', '木', '金', '土'];
  const today = new Date();
  const nowYear = today.getFullYear() + homeContainer.yearNum;
  const nowMonth = today.getMonth() + homeContainer.monthNum;
  const startDate = new Date(nowYear, nowMonth - 1, 1);
  const endDate = new Date(nowYear, nowMonth, 0);

  const daysArr: { year: number; month: number; day: number; week: string; color: string; data: any[] }[] = [];
  for (let w = startDate.getDate(); w <= endDate.getDate(); w++) {
    const dayData = {
      year: nowYear,
      month: nowMonth,
      day: w,
      week: weeks[new Date(nowYear, nowMonth - 1, w).getDay()],
      color:
        w === today.getDate() && today.getMonth() + 1 === nowMonth && nowYear === today.getFullYear()
          ? '#ff6666'
          : '#ffffff',
      data: [],
    };
    daysArr.push(dayData);
  }

  const lastType: number = 1;
  const nextType: number = 2;
  function fillDate(num: number, dataType: number) {
    if (dataType === lastType) {
      for (let i = 0; i < num; i++) {
        const day = new Date(nowYear, nowMonth - 1, 0 - i);
        daysArr.unshift({
          year: nowYear,
          month: nowMonth - 1,
          day: day.getDate(),
          week: weeks[day.getDay()],
          color: '#ffffff',
          data: [],
        });
      }
    } else if (dataType === nextType) {
      for (let i = 0; i < num; i++) {
        const day = new Date(nowYear, nowMonth, 1 + i);
        daysArr.push({
          year: nowYear,
          month: nowMonth + 1,
          day: day.getDate(),
          week: weeks[day.getDay()],
          color: '#ffffff',
          data: [],
        });
      }
    }
  }

  switch (daysArr[0].week) {
    case '日':
      break;
    case '月':
      fillDate(1, lastType);
      break;
    case '火':
      fillDate(2, lastType);
      break;
    case '水':
      fillDate(3, lastType);
      break;
    case '木':
      fillDate(4, lastType);
      break;
    case '金':
      fillDate(5, lastType);
      break;
    case '土':
      fillDate(6, lastType);
      break;
  }

  switch (daysArr[daysArr.length - 1].week) {
    case '日':
      fillDate(6, nextType);
      break;
    case '月':
      fillDate(5, nextType);
      break;
    case '火':
      fillDate(4, nextType);
      break;
    case '水':
      fillDate(3, nextType);
      break;
    case '木':
      fillDate(2, nextType);
      break;
    case '金':
      fillDate(1, nextType);
      break;
    case '土':
      break;
  }

  // スケジュールデータ挿入
  homeContainer.scheduleData.forEach((schedule: ScheduleDataType) => {
    daysArr.forEach((calenderDay: CalenderDayType) => {
      if (
        Number(schedule.Year) === calenderDay.year &&
        Number(schedule.Month) === calenderDay.month &&
        Number(schedule.Day) === calenderDay.day
      ) {
        calenderDay.data.push(schedule);
      }
    });
  });

  const parseDaysArr = [];
  for (let i = 0; i < 5; i++) {
    parseDaysArr.push(daysArr.slice(0 + i * 7, 7 + i * 7));
  }

  return (
    <div className="container">
      <h2 className="calender-head-text">
        {nowYear}年{nowMonth}月
      </h2>
      <div className="calender-wrapper">
        <div className="weeks-wrapper">
          {weeks.map((item, i) => (
            <div className="cell week-cell">
              <p className="week-text">{item}</p>
            </div>
          ))}
        </div>
        {parseDaysArr.map((week, i) => (
          <div className="day-wrapper" key={i}>
            {week.map((day, ii) => (
              <div className="cell" key={ii}>
                <p
                  className="day-text"
                  style={{ backgroundColor: day.color }}
                  data-year={day.year}
                  data-month={day.month}
                  data-day={day.day}
                  onClick={(e) => showInputModal(e, homeContainer)}
                >
                  {day.day}
                </p>
                {day.data.map((data: ScheduleDataType, s) => (
                  <div>
                    {s < 2 && (
                      <p
                        className="plan-name"
                        key={s}
                        data-id={data.Id}
                        data-name={data.Name}
                        data-year={data.Year}
                        data-month={data.Month}
                        data-day={data.Day}
                        data-time={data.ScheduleTime}
                        onClick={(e) => showScheduleDetailModal(e, homeContainer)}
                        style={{ backgroundColor: data.Color }}
                      >
                        {data.Name.length > 5 ? `${data.Name.slice(0, 5)}...` : data.Name}
                        <span className="plan-time">{data.ScheduleTime}</span>
                      </p>
                    )}
                  </div>
                ))}
                {day.data.length > 2 && (
                  <p
                    className="other-schedule"
                    onClick={() => openScheduleModal(homeContainer, day.data, day.year, day.month, day.day)}
                  >
                    他{day.data.length - 2}件を表示...
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

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

const InputModal: React.FC<{ homeContainer: HomeContainerType }> = React.memo(({ homeContainer }) => {
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

const ScheduleModal: React.FC<{ homeContainer: HomeContainerType }> = ({ homeContainer }) => {
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

const ScheduleDetailModal: React.FC<{ homeContainer: HomeContainerType }> = ({ homeContainer }) => {
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

const ScheduleEditModal: React.FC<{ homeContainer: HomeContainerType }> = ({ homeContainer }) => {
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

const HomeScreen: React.FC = () => {
  const homeContainer: HomeContainerType = useContainer(HomeContainer);
  useEffect(() => {
    getScheduleData(homeContainer);
  }, [homeContainer.getDataFlag]);
  return (
    <div>
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
