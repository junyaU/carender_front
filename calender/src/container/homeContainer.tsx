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
  time: string;
  color: string;
};
type ScheduleAction = {
  type: ScheduleActionTypes;
  payload: ScheduleState;
};
const ScheduleActionType = {
  name: 'name',
  time: 'time',
  color: 'color',
} as const;
type ScheduleActionTypes = typeof ScheduleActionType[keyof typeof ScheduleActionType];

type ScheduleDetailState = {
  id: number;
  name: string;
  year: number;
  month: number;
  day: number;
  time: string;
};
const ScheduleDetailActionType = {
  id: 'id',
  name: 'name',
  year: 'year',
  month: 'month',
  day: 'day',
  time: 'time',
} as const;
type ScheduleDetailAction = {
  type: ScheduleDetailActionTypes;
  payload: ScheduleDetailState;
};
type ScheduleDetailActionTypes = typeof ScheduleDetailActionType[keyof typeof ScheduleDetailActionType];

type HomeModalToggleState = {
  detail: boolean;
  input: boolean;
  schedule: boolean;
  edit: boolean;
};
type HomeModalToggleAction = {
  type: HomeModalToggleActionTypes;
  payload: HomeModalToggleState;
};
const HomeModalToggleActionType = {
  detail: 'detail',
  input: 'input',
  schedule: 'schedule',
  edit: 'edit',
} as const;
type HomeModalToggleActionTypes = typeof HomeModalToggleActionType[keyof typeof HomeModalToggleActionType];

const Home = () => {
  const [monthNum, setMonthNum] = useState<number>(1);
  const [yearNum, setYearNum] = useState<number>(0);
  const [scheduleData, setScheduleData] = useState<[]>([]);
  const [dayScheduleData, setDayScheduleData] = useState<[]>([]);
  const [getDataFlag, setFlag] = useState<boolean>(false);

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
    time: '',
    color: '',
  };
  const initialScheduleDetailState = {
    id: 0,
    name: '',
    year: 0,
    month: 0,
    day: 0,
    time: '',
  };
  const initialHomeModalToggleState = {
    detail: false,
    input: false,
    schedule: false,
    edit: false,
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
      case ScheduleActionType.time:
        return { ...state, time: action.payload.time };
      case ScheduleActionType.color:
        return { ...state, color: action.payload.color };
    }
  };
  const ScheduleDetailReducer: React.Reducer<ScheduleDetailState, ScheduleDetailAction> = (state, action) => {
    switch (action.type) {
      case ScheduleDetailActionType.id:
        return { ...state, id: action.payload.id };
      case ScheduleDetailActionType.name:
        return { ...state, name: action.payload.name };
      case ScheduleDetailActionType.year:
        return { ...state, year: action.payload.year };
      case ScheduleDetailActionType.month:
        return { ...state, month: action.payload.month };
      case ScheduleDetailActionType.day:
        return { ...state, day: action.payload.day };
      case ScheduleDetailActionType.time:
        return { ...state, time: action.payload.time };
    }
  };
  const HomeModalToggleReducer: React.Reducer<HomeModalToggleState, HomeModalToggleAction> = (state, action) => {
    switch (action.type) {
      case HomeModalToggleActionType.detail:
        return { ...state, detail: action.payload.detail };
      case HomeModalToggleActionType.input:
        return { ...state, input: action.payload.input };
      case HomeModalToggleActionType.schedule:
        return { ...state, schedule: action.payload.schedule };
      case HomeModalToggleActionType.edit:
        return { ...state, edit: action.payload.edit };
    }
  };

  const [dayState, dayDispatch] = useReducer(DayReducer, initialDayState);
  const [scheduleErrorState, scheduleErrorDispatch] = useReducer(ScheduleErrorReducer, initialScheduleErrorState);
  const [scheduleState, scheduleDispatch] = useReducer(ScheduleReducer, initialScheduleState);
  const [scheduleDetailState, scheduleDetailDispatch] = useReducer(ScheduleDetailReducer, initialScheduleDetailState);
  const [homeModalToggleState, homeModalToggleDispatch] = useReducer(
    HomeModalToggleReducer,
    initialHomeModalToggleState
  );

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
  const handleScheduleTimeValue = (value: string) => {
    scheduleDispatch({ type: ScheduleActionType.time, payload: { ...scheduleState, time: value } });
  };
  const handleScheduleColorValue = (value: string) => {
    scheduleDispatch({ type: ScheduleActionType.color, payload: { ...scheduleState, color: value } });
  };
  const handleScheduleDetailIdValue = (num: number) => {
    scheduleDetailDispatch({ type: ScheduleDetailActionType.id, payload: { ...scheduleDetailState, id: num } });
  };
  const handleScheduleDetailNameValue = (value: string) => {
    scheduleDetailDispatch({ type: ScheduleDetailActionType.name, payload: { ...scheduleDetailState, name: value } });
  };
  const handleScheduleDetailYearValue = (num: number) => {
    scheduleDetailDispatch({ type: ScheduleDetailActionType.year, payload: { ...scheduleDetailState, year: num } });
  };
  const handleScheduleDetailMonthValue = (num: number) => {
    scheduleDetailDispatch({ type: ScheduleDetailActionType.month, payload: { ...scheduleDetailState, month: num } });
  };
  const handleScheduleDetailDayValue = (num: number) => {
    scheduleDetailDispatch({ type: ScheduleDetailActionType.day, payload: { ...scheduleDetailState, day: num } });
  };
  const handleScheduleDetailTimeValue = (value: string) => {
    scheduleDetailDispatch({ type: ScheduleDetailActionType.time, payload: { ...scheduleDetailState, time: value } });
  };
  const handleHomeModalDetailToggle = (bool: boolean) => {
    homeModalToggleDispatch({
      type: HomeModalToggleActionType.detail,
      payload: { ...homeModalToggleState, detail: bool },
    });
  };
  const handleHomeModalInputToggle = (bool: boolean) => {
    homeModalToggleDispatch({
      type: HomeModalToggleActionType.input,
      payload: { ...homeModalToggleState, input: bool },
    });
  };
  const handleHomeModalScheduleToggle = (bool: boolean) => {
    homeModalToggleDispatch({
      type: HomeModalToggleActionType.schedule,
      payload: { ...homeModalToggleState, schedule: bool },
    });
  };
  const handleHomeModalEditToggle = (bool: boolean) => {
    homeModalToggleDispatch({ type: HomeModalToggleActionType.edit, payload: { ...homeModalToggleState, edit: bool } });
  };

  return {
    monthNum,
    yearNum,
    dayState,
    scheduleErrorState,
    scheduleState,
    scheduleDetailState,
    scheduleData,
    dayScheduleData,
    homeModalToggleState,
    getDataFlag,
    setMonthNum,
    setYearNum,
    increaseMon,
    decreaseMon,
    scheduleDispatch,
    scheduleDetailDispatch,
    handleYearValue,
    handleMonthValue,
    handleDateValue,
    handleScheduleNameError,
    handleScheduleNameValue,
    handleScheduleTimeValue,
    handleScheduleColorValue,
    handleScheduleDetailIdValue,
    handleScheduleDetailNameValue,
    handleScheduleDetailYearValue,
    handleScheduleDetailMonthValue,
    handleScheduleDetailDayValue,
    handleScheduleDetailTimeValue,
    handleHomeModalDetailToggle,
    handleHomeModalInputToggle,
    handleHomeModalScheduleToggle,
    handleHomeModalEditToggle,
    setScheduleData,
    setDayScheduleData,
    setFlag,
  };
};

export const HomeContainer = createContainer(Home);

export type HomeContainerType = {
  monthNum: number;
  yearNum: number;
  dayState: DayState;
  scheduleErrorState: ScheduleErrorState;
  scheduleState: ScheduleState;
  scheduleDetailState: ScheduleDetailState;
  scheduleData: [];
  dayScheduleData: [];
  homeModalToggleState: HomeModalToggleState;
  getDataFlag: boolean;
  setMonthNum: React.Dispatch<React.SetStateAction<number>>;
  setYearNum: React.Dispatch<React.SetStateAction<number>>;
  increaseMon: () => void;
  decreaseMon: () => void;
  scheduleDispatch: React.Dispatch<ScheduleAction>;
  scheduleDetailDispatch: React.Dispatch<ScheduleDetailAction>;
  handleYearValue: (num: number) => void;
  handleMonthValue: (num: number) => void;
  handleDateValue: (num: number) => void;
  handleScheduleNameError: (value: { error: boolean; message: string }) => void;
  handleScheduleNameValue: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleScheduleTimeValue: (value: string) => void;
  handleScheduleColorValue: (value: string) => void;
  handleScheduleDetailIdValue: (num: number) => void;
  handleScheduleDetailNameValue: (value: string) => void;
  handleScheduleDetailYearValue: (num: number) => void;
  handleScheduleDetailMonthValue: (num: number) => void;
  handleScheduleDetailDayValue: (num: number) => void;
  handleScheduleDetailTimeValue: (value: string) => void;
  handleHomeModalDetailToggle: (bool: boolean) => void;
  handleHomeModalInputToggle: (bool: boolean) => void;
  handleHomeModalScheduleToggle: (bool: boolean) => void;
  handleHomeModalEditToggle: (bool: boolean) => void;
  setScheduleData: React.Dispatch<React.SetStateAction<[]>>;
  setDayScheduleData: React.Dispatch<React.SetStateAction<[]>>;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
};
