import {createProfileTemplate} from './view/profile.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createListTemplate} from './view/list.js';
// import {createStatsTemplate} from './view/stats.js';
import {createFilmTemplate} from './view/film.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createFooterStatsTemplate} from './view/footer-stats.js';
import {createPopupTemplate} from './view/popup.js';
import {createDetailsTemplate} from './view/details.js';
import {createCommentsTemplate} from './view/comments.js';
import {createNewCommentTemplate} from './view/new-comment.js';
import {generateFilm, generateFilter, generateFooterStats} from './mock/mock.js';

export const FILM_COUNT = 18;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const statistics = generateFooterStats();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, createProfileTemplate(films), 'beforeend');
render(siteMainElement, createFilterTemplate(filters), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');
render(siteMainElement, createListTemplate(), 'beforeend');
// render(siteMainElement, createStatsTemplate(), 'beforeend');

const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmsListContainer, createFilmTemplate(films[i]), 'beforeend');
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  render(filmsList, createShowMoreButtonTemplate(), 'beforeend');

  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(filmsListContainer, createFilmTemplate(film), 'beforeend'));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

const footerStatistics = document.querySelector('.footer__statistics');

render(footerStatistics, createFooterStatsTemplate(statistics), 'beforeend');

const filmClickHandler = function (evt) {
  if (evt.target.matches('.film-card__poster')
      || evt.target.matches('.film-card__title')
      || evt.target.matches('.film-card__comments')) {
    render(siteBodyElement, createPopupTemplate(), 'beforeend');
    siteBodyElement.style.overflow = 'hidden';

    const filmDetailsInner = document.querySelector('.film-details__inner');

    render(filmDetailsInner, createDetailsTemplate(films[0]), 'beforeend');
    render(filmDetailsInner, createCommentsTemplate(films[0]), 'beforeend');

    const newCommentWrap = document.querySelector('.film-details__comments-wrap');

    render(newCommentWrap, createNewCommentTemplate(films[0]), 'beforeend');
  }

  const filmDetails = siteBodyElement.querySelector('.film-details');
  const closeButton = filmDetails.querySelector('.film-details__close-btn');

  const closePopup = () => {
    filmDetails.remove();
    siteBodyElement.style.overflow = 'visible';
    closeButton.removeEventListener('click', closePopup);
  };

  closeButton.addEventListener('click', closePopup);
};

filmsListContainer.addEventListener('click', filmClickHandler);
