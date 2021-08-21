import {createElement} from '../utils.js';

const createProfileTemplate = (films) => {
  const filmsWatched = films.filter((film) => film.isWatched).length;
  let rating = null;

  switch (true) {
    case filmsWatched >= 1 && filmsWatched <= 10:
      rating = 'Novice';
      break;
    case filmsWatched >= 11 && filmsWatched <= 20:
      rating = 'Fan';
      break;
    case filmsWatched >= 21:
      rating = 'Movie buff';
      break;
    default:
      null;
  }

  return `<section class="header__profile profile">
    ${rating === null ? '' : `<p class="profile__rating">${rating}</p>`}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Profile {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._films);
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
