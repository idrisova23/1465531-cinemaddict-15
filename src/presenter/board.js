import SortView from '../view/sort.js';
import FilmListView from '../view/film-list.js';
import NoFilmView from '../view/no-film.js';
import ShowMoreButtonView from '../view/show-more-button.js';

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
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderFilm() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderFilms() {
    // Метод для рендеринга N-задач за раз
  }

  _renderNoFilms() {
    // Метод для рендеринга заглушки
  }

  _renderShowMoreButton() {
    // Метод, куда уйдёт логика по отрисовке кнопки допоказа задач,
    // сейчас в main.js является частью renderBoard
  }

  _renderBoard() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}
