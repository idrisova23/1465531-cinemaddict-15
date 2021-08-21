import {createElement} from '../utils.js';

const createFooterStatsTemplate = (statistics) => `<p>${statistics.count} movies inside</p>`;

export default class FooterStats {
  constructor(statistics) {
    this._statistics = statistics;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._statistics);
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
