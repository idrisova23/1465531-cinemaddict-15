import {createElement} from '../utils.js';

const createListLoadingTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>
  </section>>`
);

export default class ListLoading {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createListLoadingTemplate();
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
