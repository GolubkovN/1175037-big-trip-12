export const PATH_TYPE = [
  {name: `Taxi`, action: `to`},
  {name: `Bus`, action: `to`},
  {name: `Ship`, action: `to`},
  {name: `Transport`, action: `to`},
  {name: `Drive`, action: `to`},
  {name: `Flight`, action: `to`},
  {name: `Check-in`, action: `in`},
  {name: `Sightseeing`, action: `in`},
  {name: `Restaurant`, action: `in`},
];

export const DESTINATION = [
  `Amsterdam`,
  `New York`,
  `Bangkock`,
  `Berlin`,
  `Tokyo`,
  `Kiev`,
  `Pekin`,
];

export const DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

export const SortType = {
  PRICE: `price`,
  TIME: `time`,
  EVENT: `event`,
};

export const CountOffers = {
  MIN: 0,
  MAX: 5,
};

export const OFFERS = [
  {
    type: `Taxi`,
    title: `Order Uber`,
    price: 20,
    isChecked: false,
  },
  {
    type: `Flight`,
    title: `Switch to comfort class`,
    price: 100,
    isChecked: false,
  },
  {
    type: `Restaurant`,
    title: `Choose seats`,
    price: 5,
    isChecked: false,
  },
  {
    type: `Transport`,
    title: `Travel by train`,
    price: 40,
    isChecked: false,
  },
  {
    type: `Flight`,
    title: `Add meal`,
    price: 15,
    isChecked: false,
  },
  {
    type: `Flight`,
    title: `Add luggage`,
    price: 50,
    isChecked: false,
  },
  {
    type: `Drive`,
    title: `Rent a car`,
    price: 200,
    isChecked: false,
  },
  {
    type: `Check-in`,
    title: `Add breakfast`,
    price: 50,
    isChecked: false,
  },
  {
    type: `Sightseeing`,
    title: `Book tickets`,
    price: 40,
    isChecked: false,
  },
  {
    type: `Sightseeing`,
    title: `Lunch in city`,
    price: 30,
    isChecked: false,
  }
];
