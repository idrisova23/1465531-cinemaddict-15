import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import {FILM_COUNT} from '../main';

const AUTHORS = ['Nathanos Blightcaller', 'Accidental genius', 'Donna Martin', 'Coffee zombie', 'Disco potato'];
const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];
const TITLES = [
  'How the Grinch Stole Christmas',
  'A Little Pony Without The Carpet',
  'Friends Who Saw The Storm',
  'A Tale Of A Little Bird Who Sold Us',
  'Laziness Of The Carpet',
];
const ALTERNATIVE_TITLES = [
  'Family Who Bought The Room',
  'Happiness Without The Carpet',
  'Laziness Who Sold Themselves',
  'A Tale Of A Little Bird Of The Darkness',
  'Country Who Bought The Darkness',
];
const POSTERS = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
];
const AGE_RATINGS = [
  '0+',
  '6+',
  '12+',
  '16+',
  '18+',
];
const DIRECTORS = [
  'Christopher Nolan',
  'Luc Besson',
  'Robert Zemeckis',
  'Francis Ford Coppola',
  'Clint Eastwood',
];
const COUNTRYES = [
  'USA',
  'Italy',
  'China',
  'Germany',
  'Finland',
  'USSR',
];
const COMMENTS = [
  'a film that changed my life',
  'a true masterpiece',
  'i fell asleep at the minute two of the film',
  'post-credit scene was just amazing omg',
  'actually, film is okay',
];
const WRITERS = [
  'Heinz Herald',
  'Anne Wigton',
  'Richard Side',
  'William Seiter',
  'Peter Sullivan',
];
const ACTORS = [
  'Matt Damon',
  'Tom Hanks',
  'Al Pacino',
  'Ralph Fiennes',
  'Gary Oldman',
];
const GENRES = [
  'Adventure',
  'Film-Noir',
  'Comedy',
  'Detective',
  'Mystery',
];
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

dayjs.extend(dayjsRandom);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (min, max, point) => {
  if (min >= 0 && max > min && point > 0) {
    const rand = min + Math.random() * (max - min);
    return rand.toFixed(point);
  }

  return -1;
};

const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];

const generateUniqArray = (array, indexFrom, indexTo, separator = ', ') => {
  const randomIndexes = new Array(getRandomInteger(indexFrom, indexTo)).fill(null).map(() => array[getRandomInteger(0, array.length - 1)]);

  const mySet = new Set(randomIndexes);
  const uniqArray = Array.from(mySet);

  return uniqArray.join(separator);
};

const fancyTimeFormat = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  let duration = '';
  if (hours > 0) {
    duration += `${hours}h ${mins < 10 ? '0' : ''}`;
    duration += `${mins}m `;
  } else {
    duration += `${mins}m `;
  }

  return duration;
};

export const generateComment = () => ({
  emotion: getRandomArrayItem(EMOTIONS),
  date: dayjs.between('2019-06-10', '2021-03-02').format('YYYY/MM/DD hh:mm'),
  author: getRandomArrayItem(AUTHORS),
  comment: generateUniqArray(COMMENTS, 1, 5),
});

export const generateFilm = () => ({
  title: getRandomArrayItem(TITLES),
  alternativeTitle: getRandomArrayItem(ALTERNATIVE_TITLES),
  totalRating: getRandomFloat(3, 10, 1),
  poster: getRandomArrayItem(POSTERS),
  ageRating: getRandomArrayItem(AGE_RATINGS),
  director: getRandomArrayItem(DIRECTORS),
  writers: generateUniqArray(WRITERS, 1, 3),
  actors: generateUniqArray(ACTORS, 1, 4),
  date: dayjs.between('1991-06-10', '2021-03-02'),
  releaseCountry: getRandomArrayItem(COUNTRYES),
  runtime: fancyTimeFormat(getRandomInteger(70, 175)),
  genres: generateUniqArray(GENRES, 1, 3, ' '),
  description: generateUniqArray(DESCRIPTIONS, 1, 5, ' '),
  comments: new Array(getRandomInteger(0, 5)).fill(null).map(() => generateComment()),
  isWatchlist: Boolean(getRandomInteger(0, 1)),
  isWatched: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});

const filmToFilterMap = {
  'All movies': (films) => films.length,
  'Watchlist': (films) => films.filter((film) => film.isWatchlist).length,
  'History': (films) => films.filter((film) => film.isWatched).length,
  'Favorites': (films) => films.filter((film) => film.isFavorite).length,
};

export const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);

export const generateFooterStats = () => ({
  count: FILM_COUNT,
});
