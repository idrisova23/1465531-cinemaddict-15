import ProfileView from './view/profile.js';
import FilterMenuView from './view/filter-menu.js';
import SortView from './view/sort.js';
import FilmListView from './view/film-list.js';
import ListEmptyView from './view/list-empty.js';
import FilmView from './view/film.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FooterStatsView from './view/footer-stats.js';
import PopupView from './view/popup.js';
import FilmDetailsView from './view/film-details.js';
import CommentListView from './view/comment-list.js';
import NewCommentFormView from './view/new-comment-form.js';
import {generateFilm, generateFilter, generateFooterStats} from './mock/mock.js';
import {render, RenderPosition} from './utils.js';

export const FILM_COUNT = 18;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filters = generateFilter(films);
const statistics = generateFooterStats();

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, new ProfileView(films).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterMenuView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmListView().getElement(), RenderPosition.BEFOREEND);

const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmView(film);
  const popupComponent = new PopupView(film);

  const handleCloseButtonClick = (evt) => {
    evt.preventDefault();

    siteBodyElement.removeChild(popupComponent.getElement());
    siteBodyElement.style.overflow = 'visible';
  };

  const handleKeydown = (evt) => {
    if (evt.key === 'Escape') {
      siteBodyElement.removeChild(popupComponent.getElement());
      siteBodyElement.style.overflow = 'visible';
    }
  };

  const filmClickHandler = (evt) => {
    if (evt.target.matches('.film-card__poster') || evt.target.matches('.film-card__title') || evt.target.matches('.film-card__comments')) {
      if (siteBodyElement.querySelector('.film-details') !== null) {
        siteBodyElement.querySelector('.film-details').remove();
        siteBodyElement.style.overflow = 'visible';
      }

      render(siteBodyElement, popupComponent.getElement(), RenderPosition.BEFOREEND);

      render(popupComponent.getElement().querySelector('.film-details__inner'), new FilmDetailsView(film).getElement(), RenderPosition.BEFOREEND);
      render(popupComponent.getElement().querySelector('.film-details__inner'), new CommentListView(film).getElement(), RenderPosition.BEFOREEND);

      const newCommentWrap = document.querySelector('.film-details__comments-wrap');
      render(newCommentWrap, new NewCommentFormView().getElement(), RenderPosition.BEFOREEND);

      siteBodyElement.style.overflow = 'hidden';
    }

    popupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', handleCloseButtonClick);
    document.addEventListener('keydown', handleKeydown);
  };

  filmComponent.getElement().addEventListener('click', filmClickHandler);

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

if (films.length === 0) {
  render(siteMainElement, new ListEmptyView().getElement(), RenderPosition.BEFOREEND);
} else {
  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    renderFilm(filmsListContainer, films[i]);
  }
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  render(filmsList, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmsListContainer, film));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

const footerStatistics = document.querySelector('.footer__statistics');

render(footerStatistics, new FooterStatsView(statistics).getElement(), RenderPosition.BEFOREEND);
