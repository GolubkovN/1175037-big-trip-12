import moment from 'moment';
import {OFFERS} from '../const';
import Abstract from '../view/abstract.js';

export const humanizeDate = (date) => moment(date).format(`DD-MM-YY HH:mm`);


export const addZero = (param) => param < 10 ? `0${param}` : `${param}`;

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
