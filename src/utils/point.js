import moment from 'moment';
import {OFFERS} from '../const';

export const getFormatText = (text) => text.toLowerCase().split(` `).join(`-`);

export const humanizeDate = (date) => moment(date).format(`DD-MM-YY HH:mm`);


export const addZero = (param) => param < 10 ? `0${param}` : `${param}`;

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const filterOffers = (name) => OFFERS.filter((offer) => offer.type === name);
