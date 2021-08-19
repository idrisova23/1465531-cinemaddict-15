import {createProfileTemplate} from './view/profile.js';
import {FilterMenuView} from './view/filter-menu.js';
import {SortView} from './view/sort.js';
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
import {renderTemplate, renderElement, RenderPosition} from './utils.js';

export const FILM_COUNT = 18;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filters = generateFilter(films);
const statistics = generateFooterStats();

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

renderTemplate(siteHeaderElement, createProfileTemplate(films), 'beforeend');
renderElement(siteMainElement, new FilterMenuView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createListTemplate(), 'beforeend');
// renderTemplate(siteMainElement, createStatsTemplate(), 'beforeend');

const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderTemplate(filmsListContainer, createFilmTemplate(films[i]), 'beforeend');
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  renderTemplate(filmsList, createShowMoreButtonTemplate(), 'beforeend');

  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(filmsListContainer, createFilmTemplate(film), 'beforeend'));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

const footerStatistics = document.querySelector('.footer__statistics');

renderTemplate(footerStatistics, createFooterStatsTemplate(statistics), 'beforeend');

const filmClickHandler = function (evt) {
  if (evt.target.matches('.film-card__poster')
      || evt.target.matches('.film-card__title')
      || evt.target.matches('.film-card__comments')) {

    if (siteBodyElement.querySelector('.film-details') !== null) {
      siteBodyElement.querySelector('.film-details').remove();
      siteBodyElement.style.overflow = 'visible';
    }

    renderTemplate(siteBodyElement, createPopupTemplate(), 'beforeend');
    siteBodyElement.style.overflow = 'hidden';

    const filmDetailsInner = document.querySelector('.film-details__inner');

    renderTemplate(filmDetailsInner, createDetailsTemplate(films[0]), 'beforeend');
    renderTemplate(filmDetailsInner, createCommentsTemplate(films[0]), 'beforeend');

    const newCommentWrap = document.querySelector('.film-details__comments-wrap');

    renderTemplate(newCommentWrap, createNewCommentTemplate(films[0]), 'beforeend');
  }

  const filmDetails = siteBodyElement.querySelector('.film-details');
  const closeButton = filmDetails.querySelector('.film-details__close-btn');

  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      evt.preventDefault();

      filmDetails.remove();
      siteBodyElement.style.overflow = 'visible';
      document.removeEventListener('keydown', handleKeydown);
    }
  };

  const handleCloseButtonClick = (event) => {
    event.preventDefault();

    filmDetails.remove();
    siteBodyElement.style.overflow = 'visible';
    document.removeEventListener('keydown', handleKeydown);
  };

  document.addEventListener('keydown', handleKeydown);
  closeButton.addEventListener('click', handleCloseButtonClick);
};

filmsListContainer.addEventListener('click', filmClickHandler);
