// random number
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// random array element
export const getRandomElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

export const getBooleanValue = () => Boolean(getRandomInteger(0, 1));
