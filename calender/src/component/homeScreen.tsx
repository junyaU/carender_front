import React, { useEffect } from 'react';
import { getScheduleData, showInputModal, registerSchedule } from '../services/homeService';
import '../styles/home.css';
import { Button, Modal, Select, MenuItem } from '@material-ui/core';
import { HomeContainer, HomeContainerType } from '../container/homeContainer';
import { useContainer } from 'unstated-next';
import { InputArea } from './UI/Input';

const Calender = ({ homeContainer }: { homeContainer: HomeContainerType }) => {
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
      color: w === today.getDate() && today.getMonth() + 1 === nowMonth ? '#FF6666' : '#FFFFFF',
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
          color: '#FFFFFF',
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
          color: '#FFFFFF',
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

  homeContainer.scheduleData.forEach((schedule: { Year: string; Month: string; Day: string }) => {
    daysArr.forEach((calenderDay: { year: number; month: number; day: number; data: any[] }) => {
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
              <div
                className="cell"
                onClick={(e) => showInputModal(e, homeContainer)}
                data-year={day.year}
                data-month={day.month}
                data-day={day.day}
                key={ii}
              >
                <p className="day-text" style={{ backgroundColor: day.color }}>
                  {day.day}
                </p>
                {day.data.map((data, s) => (
                  <p className="plan-name" key={s}>
                    {data.Name}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

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
  const timeData = [12, 13, 14, 15, 16];
  return (
    <Modal
      open={homeContainer.modalShowValue}
      onClose={() => homeContainer.setmodalShowValue(false)}
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
        {/* <Select value="" displayEmpty>
          {timeData.map((data, i) => (
            <MenuItem value={data} key={i}>
              {data}
            </MenuItem>
          ))}
        </Select> */}
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

const HomeScreen: React.FC = () => {
  const homeContainer: HomeContainerType = useContainer(HomeContainer);
  useEffect(() => {
    getScheduleData(homeContainer);
  }, []);
  return (
    <div>
      <Calender homeContainer={homeContainer} />
      <ButtonArea homeContainer={homeContainer} />
      <InputModal homeContainer={homeContainer} />
    </div>
  );
};

export default HomeScreen;
