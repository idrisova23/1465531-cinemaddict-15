import AbstractView from './abstract.js';
import {MenuItem} from '../utils/const.js';

const createMainNavTemplate = () => `<nav class="main-navigation">
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;

export default class MainNav extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMainNavTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.classList.contains('main-navigation__additional') ? MenuItem.STATS : MenuItem.FILMS);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector('.main-navigation__additional');

    if (menuItem === MenuItem.STATS) {
      item.classList.add('main-navigation__additional--active');
    } else {
      item.classList.remove('main-navigation__additional--active');
    }
  }
}
