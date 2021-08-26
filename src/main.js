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
import {render, RenderPosition, remove} from './utils/render.js';

export const FILM_COUNT = 18;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filters = generateFilter(films);
const statistics = generateFooterStats();

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, new ProfileView(films), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterMenuView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmListView(), RenderPosition.BEFOREEND);

const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmView(film);
  const popupComponent = new PopupView(film);
  const filmDetailsComponent = new FilmDetailsView(film);
  const commentListComponent = new CommentListView(film);
  const newCommentComponent = new NewCommentFormView(film);

  const handleKeydown = (evt) => {
    if (evt.key === 'Escape') {
      siteBodyElement.removeChild(popupComponent.getElement());
      siteBodyElement.classList.remove('hide-overflow');

      document.removeEventListener('keydown', handleKeydown);
    }
  };

  filmDetailsComponent.setCloseClickHandler(() => {
    siteBodyElement.removeChild(popupComponent.getElement());
    siteBodyElement.classList.remove('hide-overflow');

    document.removeEventListener('keydown', handleKeydown);
  });

  const fn = () => {
    siteBodyElement.appendChild(popupComponent.getElement());
    popupComponent.getElement().appendChild(filmDetailsComponent.getElement());
    popupComponent.getElement().appendChild(commentListComponent.getElement());
    commentListComponent.getElement().appendChild(newCommentComponent.getElement());

    siteBodyElement.classList.add('hide-overflow');

    document.addEventListener('keydown', handleKeydown);
  };

  filmComponent.setFilmClickHandler('.film-card__poster', fn);
  filmComponent.setFilmClickHandler('.film-card__title', fn);
  filmComponent.setFilmClickHandler('.film-card__comments', fn);

  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
};

if (films.length === 0) {
  render(siteMainElement, new ListEmptyView(), RenderPosition.BEFOREEND);
} else {
  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    renderFilm(filmsListContainer, films[i]);
  }
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();

  render(filmsList, showMoreButtonComponent, RenderPosition.BEFOREEND);

  showMoreButtonComponent.setClickHandler(() => {
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmsListContainer, film));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      remove(showMoreButtonComponent);
    }
  });
}

const footerStatistics = document.querySelector('.footer__statistics');

render(footerStatistics, new FooterStatsView(statistics), RenderPosition.BEFOREEND);
