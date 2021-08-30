import SortView from '../view/sort.js';
import FilmListView from '../view/film-list.js';
import NoFilmView from '../view/no-film.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmPresenter from './film.js';
import {updateItem} from '../utils/common.js';
import {RenderPosition, render, remove} from '../utils/render.js';

const FILM_COUNT_PER_STEP = 5;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = new Map();

    this._sortComponent = new SortView();
    this._filmListComponent = new FilmListView();
    this._noFilmComponent = new NoFilmView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(films, filters) {
    this._boardFilms = films.slice();
    this._filters = filters;

    this._renderBoard();
  }

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._filmPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmListComponent.getElement().querySelector('.films-list__container'), this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenter.set(film.id, filmPresenter);
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._boardContainer, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._boardFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmListComponent.getElement().querySelector('.films-list'), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearFilmList() {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderFilmList() {
    render(this._boardContainer, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderFilms(0, Math.min(this._boardFilms.length, FILM_COUNT_PER_STEP));

    if (this._boardFilms.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderBoard() {
    if (this._boardFilms.length === 0) {
      this._renderNoFilms();
    } else {
      this._renderSort();
      this._renderFilmList();
    }
  }
}
