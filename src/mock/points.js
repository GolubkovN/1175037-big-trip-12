import {PATH_TYPE, DESTINATION, DESCRIPTION, OFFERS} from '../const.js';
import {getRundomIndex, getRandomInteger} from '../utils.js';

const MAX_DAYS_GAP = 2;
const LOWER_HOUR_RANGE = 0;
const UPPER_HOUR_RANGE = 23;
const LOWER_MINUTE_RANGE = 15;
const UPPER_MINUTE_RANGE = 300;

const generatePhotos = () => {
  const numberOfPhotos = getRandomInteger(1, 6);
  let eventPhotos = ``;

  for (let i = 0; i < numberOfPhotos; i++) {
    eventPhotos += `<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo">`;
  }

  return eventPhotos;
};

const generateInfo = () => {
  const description = getRundomIndex(DESCRIPTION);
  let url = ``;

  if (description !== null) {
    url = generatePhotos();
  }

  return {
    description,
    url,
  };
};

export const generatePoints = () => {
  const type = getRundomIndex(PATH_TYPE);
  const destination = getRundomIndex(DESTINATION);
  const information = generateInfo();
  const offers = getRundomIndex(OFFERS);

  const timeStart = new Date();
  const daysRange = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const currentDay = timeStart.getDate();
  timeStart.setDate(currentDay + daysRange);
  const hoursRange = getRandomInteger(LOWER_HOUR_RANGE, UPPER_HOUR_RANGE);
  timeStart.setHours(hoursRange);

  const durationMinutes = getRandomInteger(LOWER_MINUTE_RANGE, UPPER_MINUTE_RANGE);
  const timeEnd = new Date(timeStart.getTime());
  timeEnd.setMinutes(timeEnd.getMinutes() + durationMinutes);

  return {
    type,
    destination,
    offers,
    information,
    timeStart,
    timeEnd,
    totalPrice: getRandomInteger(10, 50),
  };
};
