// random value
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// random array element
export const getRandomElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

export const getFormatText = (text) => text.toLowerCase().split(` `).join(`-`);

export const formatTime = (date) => new Date(date).toLocaleString(`en-US`, {month: `short`, day: `2-digit`});

export const humanizeDate = (date) => {
  return date.toLocaleString(`en-GB`, {day: `numeric`, month: `numeric`, year: `2-digit`, hour: `numeric`, minute: `2-digit`});
};

export const pointZero = (param) => param < 10 ? `0${param}` : `${param}`;

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

export const renderElement = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component);
      break;
    case RenderPosition.BEFOREEND:
      container.append(component);
      break;
    default:
      throw new Error(`отсутствиe соответствующего значения RenderPosition`);
  }
};
