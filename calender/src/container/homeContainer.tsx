import { createContainer } from 'unstated-next';
import { useReducer, useState } from 'react';

type DayState = {
  date: number;
  month: number;
  year: number;
};
type DayAction = {
  payload: DayState;
  type: DayActionTypes;
};
const DayActionType = {
  date: 'date',
  month: 'month',
  year: 'year',
} as const;
type DayActionTypes = typeof DayActionType[keyof typeof DayActionType];

type ScheduleErrorState = {
  name: { error: boolean; message: string };
};
type ScheduleErrorAction = {
  type: ScheduleErrorTypes;
  payload: ScheduleErrorState;
};
const ScheduleErrorActionType = {
  name: 'name',
} as const;
type ScheduleErrorTypes = typeof ScheduleErrorActionType[keyof typeof ScheduleErrorActionType];

type ScheduleState = {
  name: string;
};
type ScheduleAction = {
  type: ScheduleActionTypes;
  payload: ScheduleState;
};
const ScheduleActionType = {
  name: 'name',
} as const;
type ScheduleActionTypes = typeof ScheduleActionType[keyof typeof ScheduleActionType];

const Home = () => {
  const [monthNum, setMonthNum] = useState<number>(1);
  const [yearNum, setYearNum] = useState<number>(0);
  const [modalShowValue, setmodalShowValue] = useState<boolean>(false);
  const [scheduleData, setScheduleData] = useState<[]>([]);
  const increaseMon = () => {
    const today = new Date();
    const nowMonth = today.getMonth() + monthNum;
    if (nowMonth === 12) {
      setMonthNum((prev) => prev - 11);
      setYearNum((prev) => prev + 1);
    } else {
      setMonthNum((prev) => prev + 1);
    }
  };

  const decreaseMon = () => {
    const today = new Date();
    const nowMonth = today.getMonth() + monthNum;
    if (nowMonth === 1) {
      setMonthNum((prev) => prev + 11);
      setYearNum((prev) => prev - 1);
    } else {
      setMonthNum((prev) => prev - 1);
    }
  };

  const initialDayState = {
    date: 0,
    month: 0,
    year: 0,
  };
  const initialScheduleErrorState = {
    name: { error: false, message: '' },
  };
  const initialScheduleState = {
    name: '',
  };

  const DayReducer: React.Reducer<DayState, DayAction> = (state, action) => {
    switch (action.type) {
      case DayActionType.month:
        return { ...state, month: action.payload.month };
      case DayActionType.date:
        return { ...state, date: action.payload.date };
      case DayActionType.year:
        return { ...state, year: action.payload.year };
    }
  };
  const ScheduleErrorReducer: React.Reducer<ScheduleErrorState, ScheduleErrorAction> = (state, action) => {
    switch (action.type) {
      case ScheduleErrorActionType.name:
        return { ...state, name: action.payload.name };
    }
  };
  const ScheduleReducer: React.Reducer<ScheduleState, ScheduleAction> = (state, action) => {
    switch (action.type) {
      case ScheduleActionType.name:
        return { ...state, name: action.payload.name };
    }
  };

  const [dayState, dayDispatch] = useReducer(DayReducer, initialDayState);
  const [scheduleErrorState, scheduleErrorDispatch] = useReducer(ScheduleErrorReducer, initialScheduleErrorState);
  const [scheduleState, scheduleDispatch] = useReducer(ScheduleReducer, initialScheduleState);

  const handleYearValue = (num: number) => {
    dayDispatch({ type: DayActionType.year, payload: { ...dayState, year: num } });
  };
  const handleMonthValue = (num: number) => {
    dayDispatch({ type: DayActionType.month, payload: { ...dayState, month: num } });
  };
  const handleDateValue = (num: number) => {
    dayDispatch({ type: DayActionType.date, payload: { ...dayState, date: num } });
  };
  const handleScheduleNameError = (value: { error: boolean; message: string }) => {
    scheduleErrorDispatch({
      type: ScheduleErrorActionType.name,
      payload: { ...scheduleErrorState, name: { error: value.error, message: value.message } },
    });
  };
  const handleScheduleNameValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    scheduleDispatch({ type: ScheduleActionType.name, payload: { ...scheduleState, name: e.currentTarget.value } });
  };

  return {
    monthNum,
    yearNum,
    modalShowValue,
    dayState,
    scheduleErrorState,
    scheduleState,
    scheduleData,
    setMonthNum,
    setYearNum,
    increaseMon,
    decreaseMon,
    setmodalShowValue,
    handleYearValue,
    handleMonthValue,
    handleDateValue,
    handleScheduleNameError,
    handleScheduleNameValue,
    setScheduleData,
  };
};

export const HomeContainer = createContainer(Home);

export type HomeContainerType = {
  monthNum: number;
  yearNum: number;
  modalShowValue: boolean;
  dayState: DayState;
  scheduleErrorState: ScheduleErrorState;
  scheduleState: ScheduleState;
  scheduleData: [];
  setMonthNum: React.Dispatch<React.SetStateAction<number>>;
  setYearNum: React.Dispatch<React.SetStateAction<number>>;
  increaseMon: () => void;
  decreaseMon: () => void;
  setmodalShowValue: React.Dispatch<React.SetStateAction<boolean>>;
  handleYearValue: (num: number) => void;
  handleMonthValue: (num: number) => void;
  handleDateValue: (num: number) => void;
  handleScheduleNameError: (value: { error: boolean; message: string }) => void;
  handleScheduleNameValue: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setScheduleData: React.Dispatch<React.SetStateAction<[]>>;
};
