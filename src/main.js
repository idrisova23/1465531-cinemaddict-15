import ProfileView from './view/profile.js';
import FilterMenuView from './view/filter-menu.js';
import FooterStatsView from './view/footer-stats.js';
import {generateFilm, generateFilter, generateFooterStats} from './mock/mock.js';
import BoardPresenter from './presenter/board.js';
import {render, RenderPosition} from './utils/render.js';

export const FILM_COUNT = 23;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filters = generateFilter(films);
const statistics = generateFooterStats();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const boardPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, new ProfileView(films), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterMenuView(filters), RenderPosition.BEFOREEND);

boardPresenter.init(films, filters);

const footerStatistics = document.querySelector('.footer__statistics');

render(footerStatistics, new FooterStatsView(statistics), RenderPosition.BEFOREEND);
