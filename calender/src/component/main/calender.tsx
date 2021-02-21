import React from 'react';
import { showInputModal, showScheduleDetailModal, openScheduleModal } from '../../services/homeService';
import '../../styles/home.css';
import { HomeContainerType } from '../../container/homeContainer';

export type ScheduleDataType = {
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

export default Calender;
