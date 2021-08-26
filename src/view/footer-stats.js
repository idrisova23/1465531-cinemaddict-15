import AbstractView from './abstract.js';

const createFooterStatsTemplate = (statistics) => `<p>${statistics.count} movies inside</p>`;

export default class FooterStats extends AbstractView {
  constructor(statistics) {
    super();
    this._statistics = statistics;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._statistics);
  }
}
