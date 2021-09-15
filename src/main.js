import ProfileView from './view/profile.js';
import MainNavView from './view/main-nav.js';
import StatsView from './view/stats.js';
import FooterStatsView from './view/footer-stats.js';
import {generateFilm, generateFooterStats} from './mock/mock.js';
import BoardPresenter from './presenter/board.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import {MenuItem} from './utils/const.js';
import {render, remove, RenderPosition} from './utils/render.js';

export const FILM_COUNT = 18;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const statistics = generateFooterStats();

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteMenuComponent = new MainNavView();

render(siteHeaderElement, new ProfileView(films), RenderPosition.BEFOREEND);
render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMenuComponent, filterModel, filmsModel);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.FILMS:
      boardPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      boardPresenter.destroy();
      statisticsComponent = new StatsView(filmsModel.getFilms());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
boardPresenter.init();

const footerStatistics = document.querySelector('.footer__statistics');

render(footerStatistics, new FooterStatsView(statistics), RenderPosition.BEFOREEND);
