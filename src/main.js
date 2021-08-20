import ProfileView from './view/profile.js';
import FilterMenuView from './view/filter-menu.js';
import SortView from './view/sort.js';
import FilmListView from './view/film-list.js';
import FilmView from './view/film.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FooterStatsView from './view/footer-stats.js';
import PopupView from './view/popup.js';
import FilmDetailsView from './view/film-details.js';
import CommentListView from './view/comment-list.js';
import NewCommentFormView from './view/new-comment-form.js';
import {generateFilm, generateFilter, generateFooterStats} from './mock/mock.js';
import {renderElement, RenderPosition} from './utils.js';

export const FILM_COUNT = 18;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filters = generateFilter(films);
const statistics = generateFooterStats();

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

renderElement(siteHeaderElement, new ProfileView(films).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilterMenuView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmListView().getElement(), RenderPosition.BEFOREEND);

const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

// const filmComponent = new FilmView();

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderElement(filmsListContainer, new FilmView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  renderElement(filmsList, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderElement(filmsListContainer, new FilmView(film).getElement(), RenderPosition.BEFOREEND));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

const footerStatistics = document.querySelector('.footer__statistics');

renderElement(footerStatistics, new FooterStatsView(statistics).getElement(), RenderPosition.BEFOREEND);

const filmClickHandler = function (evt) {
  if (evt.target.matches('.film-card__poster')
      || evt.target.matches('.film-card__title')
      || evt.target.matches('.film-card__comments')) {

    if (siteBodyElement.querySelector('.film-details') !== null) {
      siteBodyElement.querySelector('.film-details').remove();
      siteBodyElement.style.overflow = 'visible';
    }

    renderElement(siteBodyElement, new PopupView().getElement(), RenderPosition.BEFOREEND);
    siteBodyElement.style.overflow = 'hidden';

    const filmDetailsInner = document.querySelector('.film-details__inner');

    renderElement(filmDetailsInner, new FilmDetailsView(films[0]).getElement(), RenderPosition.BEFOREEND);
    renderElement(filmDetailsInner, new CommentListView(films[0]).getElement(), RenderPosition.BEFOREEND);

    const newCommentWrap = document.querySelector('.film-details__comments-wrap');

    renderElement(newCommentWrap, new NewCommentFormView().getElement(), RenderPosition.BEFOREEND);
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
