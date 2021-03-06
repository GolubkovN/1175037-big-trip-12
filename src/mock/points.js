import {PATH_TYPE, DESTINATION, DESCRIPTION} from '../const.js';
import {getRandomElement, getRandomInteger, getBooleanValue} from '../utils/common.js';
import {generateId, filterOffers} from '../utils/point.js';

const MAX_DAYS_GAP = 7;
const MILLISECONDS_IN_MINUTE = 60000;

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
  const daysRange = getRandomInteger(0, MAX_DAYS_GAP);
  const currentDay = timeStart.getDate();
  timeStart.setDate(currentDay + daysRange);
  const hoursRange = getRandomInteger(HourRange.LOWER, HourRange.UPPER);
  timeStart.setHours(hoursRange);

  const durationMinutes = getRandomInteger(MinuteRange.LOWER, MinuteRange.UPPER);
  const timeEnd = new Date(timeStart.getTime());
  timeEnd.setMinutes(timeEnd.getMinutes() + durationMinutes);
  const duration = (timeEnd - timeStart) / MILLISECONDS_IN_MINUTE;

  const type = getRandomElement(PATH_TYPE);

  return {
    id: generateId(),
    type,
    destination: getRandomElement(DESTINATION),
    offers: filterOffers(type.name).map((offer) => {
      offer.isChecked = getBooleanValue();
      return offer;
    }),
    information: generateInfo(),
    timeStart,
    timeEnd,
    duration,
    pointPrice: getRandomInteger(PriceRange.MIN, PriceRange.MAX),
  };
};
