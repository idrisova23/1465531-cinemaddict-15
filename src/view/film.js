import AbstractView from './abstract.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const SYMBOL_COUNT = 139;

const createFilmTemplate = (film) => {
  const {title, totalRating, date, runtime, genres, poster, description, comments, isWatchlist, isHistory, isFavorites} = film;

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date.format('YYYY')}</span>
      <span class="film-card__duration">${dayjs.duration(runtime, 'minutes').format('H[h] mm[m]')}</span>
      <span class="film-card__genre">${genres.split(' ')[0]}</span>
    </p>
    <img src=${poster} alt="" class="film-card__poster">
    <p class="film-card__description">${description.length > SYMBOL_COUNT ? `${description.slice(0, SYMBOL_COUNT)  }...` : description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isWatchlist && 'film-card__controls-item--active'}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isHistory && 'film-card__controls-item--active'}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorites && 'film-card__controls-item--active'}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class Film extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._filmClickHandler = this._filmClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  _filmClickHandler(evt) {
    evt.preventDefault();
    this._callback.filmClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _historyClickHandler(evt) {
    evt.preventDefault();
    this._callback.historyClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFilmClickHandler(callback) {
    this._callback.filmClick = callback;
    this.getElement()
      .querySelector('.film-card__poster')
      .addEventListener('click', this._filmClickHandler);
    this.getElement()
      .querySelector('.film-card__title')
      .addEventListener('click', this._filmClickHandler);
    this.getElement()
      .querySelector('.film-card__comments')
      .addEventListener('click', this._filmClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._historyClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }
}
