import FilmView from '../view/film.js';
import PopupView from '../view/popup.js';
import FilmDetailsView from '../view/film-details.js';
import CommentListView from '../view/comment-list.js';
import NewCommentFormView from '../view/new-comment-form.js';
import {RenderPosition, render, replace, remove} from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

export default class Film {
  constructor(filmListContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._escKeyDownHandler =  this._escKeyDownHandler.bind(this);
    this._filmClickHandler = this._filmClickHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmComponent = new FilmView(film);
    this._popupComponent = new PopupView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);
    this._commentListComponent = new CommentListView(film);
    this._newCommentComponent = new NewCommentFormView(film);

    this._filmComponent.setFilmClickHandler(this._filmClickHandler);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmDetailsComponent.setCloseClickHandler(this._closeClickHandler);
    this._filmDetailsComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmComponent === null || prevPopupComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filmComponent, prevFilmComponent);
    replace(this._popupComponent, prevPopupComponent);

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._popupComponent);
  }

  _showPopup() {
    render(this._filmListContainer, this._popupComponent, RenderPosition.BEFOREEND);
    this._popupComponent.getElement().appendChild(this._filmDetailsComponent.getElement());
    this._popupComponent.getElement().appendChild(this._commentListComponent.getElement());
    this._commentListComponent.getElement().appendChild(this._newCommentComponent.getElement());

    document.querySelector('body').classList.add('hide-overflow');

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _closePopup() {
    this._filmListContainer.removeChild(this._popupComponent.getElement());
    document.querySelector('body').classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _filmClickHandler() {
    this._showPopup();
  }

  _closeClickHandler() {
    this._closePopup();
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatchlist: !this._film.isWatchlist,
        },
      ),
    );
  }

  _handleHistoryClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isHistory: !this._film.isHistory,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }
}
