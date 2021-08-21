import {createElement} from '../utils.js';

const createPopupTemplate = () => (
  `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    </form>
  </section>`
);

export default class Popup {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createPopupTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
