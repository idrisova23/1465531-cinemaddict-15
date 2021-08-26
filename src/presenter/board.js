import SortView from '../view/sort.js';
import FilmListView from '../view/film-list.js';
import NoFilmView from '../view/no-film.js';
import FilmView from '../view/film.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import {RenderPosition, render} from '../utils/render.js';

const FILM_COUNT_PER_STEP = 5;
export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._sortComponent = new SortView();
    this._filmListComponent = new FilmListView();
    this._noFilmComponent = new NoFilmView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
  }

  init(films, filters) {
    this._films = films.slice();
    this._filters = filters;

    this._renderBoard();
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderFilm(film) {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderFilmList(from, to) {
    // Метод для рендеринга N-задач за раз
  }

  _renderNoFilm() {
    // Метод для рендеринга заглушки
  }

  _renderShowMoreButton() {
    // Метод, куда уйдёт логика по отрисовке кнопки допоказа задач,
    // сейчас в main.js является частью renderBoard
  }

  _renderBoard() {
    if (this._films.length === 0) {
      this._renderNoFilm();
    } else {
      for (let i = 0; i < Math.min(this._films.length, FILM_COUNT_PER_STEP); i++) {
        this._renderFilm(this._films[i]);
      }
    }

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }
}
