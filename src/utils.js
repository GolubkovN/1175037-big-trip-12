// random value
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// random array index
export const getRundomIndex = (arr) => {
  const rundomIndex = getRandomInteger(0, arr.length - 1);
  return arr[rundomIndex];
};

const addZero = (time) => {
  return time < 10 ? `0${time}` : time;
};

// format time from ms
export const formatTime = (ms) => {
  const minutes = ms / 1000 / 60;
  let days = addZero(Math.floor(minutes / 60 / 24));
  let hours = addZero(Math.floor(minutes / 60) % 24);
  let min = addZero(minutes - days * 24 * 60 - hours * 60);

  days = days !== `00` ? `${days}D` : ``;
  hours = hours !== `00` ? `${hours}H` : ``;
  min = min !== `00` ? `${min}M` : ``;

  return `${days} ${hours} ${min}`;
};

export const getDatesDuration = (date1InInt, date2InInt) => {
  const date1 = new Date(date1InInt);
  const date2 = new Date(date2InInt);
  return {
    daysBetween: date2.getDate() - date1.getDate(),
  };
};
