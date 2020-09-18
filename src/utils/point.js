import moment from 'moment';
import {OFFERS} from '../const';
import Abstract from '../view/abstract.js';

export const humanizeDate = (date) => moment(date).format(`DD-MM-YY HH:mm`);

export const normalDuration = (start, end) => {
  const duration = moment.duration(Date.parse(end) - Date.parse(start));

  return (
    `${duration.days() === 0 ? `` : `${moment(duration.days(), `D`).format(`D`)}D`}
    ${duration.hours() === 0 ? `` : ` ${moment(duration.hours(), `H`).format(`H`)}H`}
    ${duration.minutes() === 0 ? `` : ` ${moment(duration.minutes(), `m`).format(`mm`)}M`}`
  );
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const filterOffers = (name) => OFFERS.filter((offer) => offer.type === name);

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export const isDatesEqual = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return true;
  }

  return moment(dateA).isSame(dateB, `day`);
};
