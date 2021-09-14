import ProfileView from './view/profile.js';
import FooterStatsView from './view/footer-stats.js';
import {generateFilm, generateFooterStats} from './mock/mock.js';
import BoardPresenter from './presenter/board.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import {render, RenderPosition} from './utils/render.js';

export const FILM_COUNT = 18;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const statistics = generateFooterStats();

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, new ProfileView(films), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

filterPresenter.init();
boardPresenter.init();

const footerStatistics = document.querySelector('.footer__statistics');

render(footerStatistics, new FooterStatsView(statistics), RenderPosition.BEFOREEND);
