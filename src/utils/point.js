export const getFormatText = (text) => text.toLowerCase().split(` `).join(`-`);

export const formatTime = (date) => new Date(date).toLocaleString(`en-US`, {month: `short`, day: `2-digit`});

export const humanizeDate = (date) => {
  return date.toLocaleString(`en-GB`, {day: `numeric`, month: `numeric`, year: `2-digit`, hour: `numeric`, minute: `2-digit`});
};

export const addZero = (param) => param < 10 ? `0${param}` : `${param}`;

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);
