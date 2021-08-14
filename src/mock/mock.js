import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import {FILM_COUNT} from '../main';

const space = ' ';
const comma = ', ';

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

const getUniqIndexes = (randomIndexes, separator) => {
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

const generateEmotion = () => {
  const emotions = ['smile', 'sleeping', 'puke', 'angry'];

  return emotions[getRandomInteger(0, emotions.length - 1)];
};

const generateAutors = () => {
  const autors = [
    'Nathanos Blightcaller',
    'Accidental genius',
    'Donna Martin',
    'Coffee zombie',
    'Disco potato',
  ];

  return autors[getRandomInteger(0, autors.length - 1)];
};

const getRandomText = () => {
  const text = [
    'a film that changed my life',
    'a true masterpiece',
    'i fell asleep at the minute two of the film',
    'post-credit scene was just amazing omg',
    'actually, film is okay',
  ];

  const comment = new Array(getRandomInteger(1, 5)).fill().map(() => text[getRandomInteger(0, text.length - 1)]);

  return getUniqIndexes(comment, comma);
};

export const generateComment = () => ({
  emotion: generateEmotion(),
  date: dayjs.between('2019-06-10', '2021-03-02').format('YYYY/MM/DD hh:mm'),
  author: generateAutors(),
  comment: getRandomText(),
});

const generateTitle = () => {
  const titles = [
    'How the Grinch Stole Christmas',
    'A Little Pony Without The Carpet',
    'Friends Who Saw The Storm',
    'A Tale Of A Little Bird Who Sold Us',
    'Laziness Of The Carpet',
  ];

  return titles[getRandomInteger(0, titles.length - 1)];
};

const generateAlternativeTitle = () => {
  const alternativeTitles = [
    'Family Who Bought The Room',
    'Happiness Without The Carpet',
    'Laziness Who Sold Themselves',
    'A Tale Of A Little Bird Of The Darkness',
    'Country Who Bought The Darkness',
  ];

  return alternativeTitles[getRandomInteger(0, alternativeTitles.length - 1)];
};

const generatePoster = () => {
  const posters = [
    './images/posters/made-for-each-other.png',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/the-great-flamarion.jpg',
  ];

  return posters[getRandomInteger(0, posters.length - 1)];
};

const generateAgeRating = () => {
  const ageRatings = [
    '0+',
    '6+',
    '12+',
    '16+',
    '18+',
  ];

  return ageRatings[getRandomInteger(0, ageRatings.length - 1)];
};

const generateDirector = () => {
  const directors = [
    'Christopher Nolan',
    'Luc Besson',
    'Robert Zemeckis',
    'Francis Ford Coppola',
    'Clint Eastwood',
  ];

  return directors[getRandomInteger(0, directors.length - 1)];
};

const generateWriters = () => {
  const names = [
    'Heinz Herald',
    'Anne Wigton',
    'Richard Side',
    'William Seiter',
    'Peter Sullivan',
  ];

  const writers = new Array(getRandomInteger(1, 3)).fill().map(() => names[getRandomInteger(0, names.length - 1)]);

  return getUniqIndexes(writers, comma);
};

const generateActors = () => {
  const names = [
    'Matt Damon',
    'Tom Hanks',
    'Al Pacino',
    'Ralph Fiennes',
    'Gary Oldman',
  ];

  const actors = new Array(getRandomInteger(1, 4)).fill().map(() => names[getRandomInteger(0, names.length - 1)]);

  return getUniqIndexes(actors, comma);
};

const generateCountry = () => {
  const countryes = [
    'USA',
    'Italy',
    'China',
    'Germany',
    'Finland',
    'USSR',
  ];

  return countryes[getRandomInteger(0, countryes.length - 1)];
};

const generateGenres = () => {
  const names = [
    'Adventure',
    'Film-Noir',
    'Comedy',
    'Detective',
    'Mystery',
  ];

  const genres = new Array(getRandomInteger(1, 2)).fill().map(() => names[getRandomInteger(0, names.length - 1)]);

  return getUniqIndexes(genres, space);
};

const generateDescription = () => {
  const text = [
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

  const description = new Array(getRandomInteger(1, 5)).fill().map(() => text[getRandomInteger(0, text.length - 1)]);

  return getUniqIndexes(description, space);
};

export const generateFilm = () => ({
  title: generateTitle(),
  alternativeTitle: generateAlternativeTitle(),
  totalRating: getRandomFloat(3, 10, 1),
  poster: generatePoster(),
  ageRating: generateAgeRating(),
  director: generateDirector(),
  writers: generateWriters(),
  actors: generateActors(),
  date: dayjs.between('1991-06-10', '2021-03-02'),
  releaseCountry: generateCountry(),
  runtime: fancyTimeFormat(getRandomInteger(70, 175)),
  genres: generateGenres(),
  description: generateDescription(),
  comments: new Array(getRandomInteger(0, 5)).fill().map(() => generateComment()),
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
