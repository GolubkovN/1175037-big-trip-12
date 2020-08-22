// random number
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// random array element
export const getRandomElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

export const getBooleanValue = (param) => Boolean(param);

export const getFormatText = (text) => text.toLowerCase().split(` `).join(`-`);

export const formatTime = (date) => new Date(date).toLocaleString(`en-US`, {month: `short`, day: `2-digit`});

export const humanizeDate = (date) => {
  return date.toLocaleString(`en-GB`, {day: `numeric`, month: `numeric`, year: `2-digit`, hour: `numeric`, minute: `2-digit`});
};

export const addZero = (param) => param < 10 ? `0${param}` : `${param}`;

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    default:
      throw new Error(`отсутствиe соответствующего значения RenderPosition`);
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
