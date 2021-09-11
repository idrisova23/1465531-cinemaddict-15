import AbstractView from './abstract.js';
import {SortType} from '../utils/const.js';

const createSortTemplate = (currentSortType) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button ${currentSortType === SortType.DEFAULT && 'sort__button--active'}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.DATE_DOWN && 'sort__button--active'}" data-sort-type="${SortType.DATE_DOWN}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.RATING_DOWN && 'sort__button--active'}" data-sort-type="${SortType.RATING_DOWN}">Sort by rating</a></li>
  </ul>`
);

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._prevElement = null;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();

    if (this._prevElement === null) {
      this._prevElement = document.querySelector('.sort__button--active');
    }

    this._prevElement.classList.remove('sort__button--active');
    evt.target.classList.add('sort__button--active');
    this._prevElement = evt.target;

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
