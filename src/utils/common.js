// random number
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// random array element
export const getRandomElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

export const getBooleanValue = () => Boolean(getRandomInteger(0, 1));

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

export const getAction = (obj) => {
  if (obj.name === `Check-in` || obj.name === `Sightseeing` || obj.name === `Restaurant`) {
    return `in`;
  }

  return `to`;
};

