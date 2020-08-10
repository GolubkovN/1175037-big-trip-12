import {PATH_TYPE, DESTINATION, DESCRIPTION} from '../const.js';
import {getRundomIndex, getRandomInteger} from '../utils.js';

const DATE_RANGE = 2;
const LOWER_HOUR_RANGE = 0;
const UPPER_HOUR_RANGE = 23;
const LOWER_MINUTE_RANGE = 15;
const UPPER_MINUTE_RANGE = 300;

const generatePhotos = () => {
  const getUrl = () => `http://picsum.photos/248/152?r=${Math.random()}`;
  const photosCount = getRandomInteger(1, 5);

  return Array(photosCount).fill().map(getUrl);
};

const generateInfo = () => {
  const description = getRundomIndex(DESCRIPTION);
  const url = generatePhotos();

  return {
    description,
    url,
  };
};

const generateOffers = () => {
  const offers = [
    {title: `Add luggage`, price: 30},
    {title: `Switch to comfort class`, price: 100},
    {title: `Add meal`, price: 15},
    {title: `Choose seats`, price: 5},
    {title: `Travel by trai`, price: 40},
  ];

  const randomOffer = getRundomIndex(offers);
  return randomOffer;
};

export const generatePoints = () => {
  const type = getRundomIndex(PATH_TYPE);
  const destination = getRundomIndex(DESTINATION);
  const information = generateInfo();
  const offers = generateOffers();

  const timeStart = new Date();
  const daysRange = getRandomInteger(-DATE_RANGE, DATE_RANGE);
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
