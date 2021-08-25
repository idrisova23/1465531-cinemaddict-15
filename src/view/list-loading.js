import AbstractView from './abstract.js';

const createListLoadingTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>
  </section>>`
);

export default class ListLoading extends AbstractView {
  getTemplate() {
    return createListLoadingTemplate();
  }
}
