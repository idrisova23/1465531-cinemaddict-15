import {createProfileTemplate} from './view/profile.js';
import {createNavigationTemplate} from './view/navigation.js';
import {createSortTemplate} from './view/sort.js';
import {createListTemplate} from './view/list.js';
// import {createStatsTemplate} from './view/stats.js';
import {createFilmTemplate} from './view/film.js';
import {createShowMoreTemplate} from './view/show-more.js';
import {createFooterStatsTemplate} from './view/footer-stats.js';
import {createPopupTemplate} from './view/popup.js';
import {createDetailsTemplate} from './view/details.js';
import {createCommentsTemplate} from './view/comments.js';
import {generateFilm, generateNavigation, generateProfileRating, generateFooterStats} from './mock/mock.js';

const FILM_COUNT = 14;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const navigation = generateNavigation();
const rating = generateProfileRating();
const statistics = generateFooterStats();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, createProfileTemplate(rating), 'beforeend');
render(siteMainElement, createNavigationTemplate(navigation), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');
render(siteMainElement, createListTemplate(), 'beforeend');
// render(siteMainElement, createStatsTemplate(), 'beforeend');

const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsListContainer, createFilmTemplate(films[i]), 'beforeend');
}

render(filmsList, createShowMoreTemplate(), 'beforeend');

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
