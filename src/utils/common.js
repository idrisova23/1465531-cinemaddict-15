import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFloat = (min, max, point) => {
  if (min >= 0 && max > min && point > 0) {
    const rand = min + Math.random() * (max - min);
    return rand.toFixed(point);
  }

  return -1;
};

export const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];

export const generateUniqArray = (array, indexFrom, indexTo, separator = ', ') => {
  const randomIndexes = new Array(getRandomInteger(indexFrom, indexTo)).fill(null).map(() => array[getRandomInteger(0, array.length - 1)]);

  const mySet = new Set(randomIndexes);
  const uniqArray = Array.from(mySet);

  return uniqArray.join(separator);
};

export const sortByDate = (filmA, filmB) => dayjs(filmB.date).diff(dayjs(filmA.date));

export const sortByRating = (filmA, filmB) => filmB.totalRating - filmA.totalRating;
