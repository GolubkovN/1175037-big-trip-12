import {PATH_TYPE, DESTINATION, DESCRIPTION, OFFERS} from '../const.js';
import {getRandomElement, getRandomInteger, getBooleanValue} from '../utils/common.js';
import {generateId} from '../utils/point.js';

const MAX_DAYS_GAP = 7;

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
  const duration = (timeEnd - timeStart) / 60000;

  const type = getRandomElement(PATH_TYPE);

  return {
    id: generateId(),
    type,
    destination: getRandomElement(DESTINATION),
    offers: OFFERS.filter((offer) => offer.type === type.name).map((offer) => {
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
