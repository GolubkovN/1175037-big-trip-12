import moment from 'moment';

export const getFormatText = (text) => text.toLowerCase().split(` `).join(`-`);

// export const formatTime = (date) => new Date(date).toLocaleString(`en-US`, {month: `short`, day: `2-digit`});

export const humanizeDate = (date) => {
  return moment(date).format(`DD-MM-YY HH:mm`);
};

export const addZero = (param) => param < 10 ? `0${param}` : `${param}`;

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);
