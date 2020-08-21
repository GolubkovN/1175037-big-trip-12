import {PATH_TYPE, DESTINATION, DESCRIPTION, OFFERS} from '../const.js';
import {getRandomElement, getRandomInteger} from '../utils.js';

const MAX_DAYS_GAP = 2;


const HourRange = {
  LOWER: 0,
  UPPER: 23,
};

const MinuteRange = {
  LOWER: 15,
  UPPER: 300,
};

const PriceRange = {
  MIN: 100,
  MAX: 500,
};

const PhotosCount = {
  MIN: 1,
  MAX: 5
};

const generatePhotos = () => {
  const photosQuantity = getRandomInteger(PhotosCount.MIN, PhotosCount.MAX);

  return new Array(photosQuantity)
    .fill(``)
    .map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
};

const generateInfo = () => ({
  description: getRandomElement(DESCRIPTION),
  url: generatePhotos()
});

export const generatePoint = () => {

  const timeStart = new Date();
  const daysRange = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const currentDay = timeStart.getDate();
  timeStart.setDate(currentDay + daysRange);
  const hoursRange = getRandomInteger(HourRange.LOWER, HourRange.UPPER);
  timeStart.setHours(hoursRange);

  const durationMinutes = getRandomInteger(MinuteRange.LOWER, MinuteRange.UPPER);
  const timeEnd = new Date(timeStart.getTime());
  timeEnd.setMinutes(timeEnd.getMinutes() + durationMinutes);
  const duration = Math.round((timeEnd - timeStart) / 60000);

  return {
    type: getRandomElement(PATH_TYPE),
    destination: getRandomElement(DESTINATION),
    offers: OFFERS,
    information: generateInfo(),
    timeStart,
    timeEnd,
    duration,
    pointPrice: getRandomInteger(PriceRange.MIN, PriceRange.MAX),
  };
};