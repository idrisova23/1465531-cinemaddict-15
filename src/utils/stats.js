import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const countHistoryFilmInDateRange = (films, dateFrom, dateTo) =>
  films.reduce((counter, film) => {
    if (!film.already_watched) {
      return counter;
    }

    if (
      dayjs(film.already_watched).isSame(dateFrom) ||
      dayjs(film.already_watched).isBetween(dateFrom, dateTo) ||
      dayjs(film.already_watched).isSame(dateTo)
    ) {
      return counter + 1;
    }

    return counter;
  }, 0);

export const makeItemsUniq = (items) => [...new Set(items)];

export const countFilmsByCount = (films, genre) => films.filter((film) => film.genres.includes(genre)).length;
