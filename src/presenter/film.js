import FilmView from '../view/film.js';
import PopupView from '../view/popup.js';
import FilmDetailsView from '../view/film-details.js';
import CommentListView from '../view/comment-list.js';
import NewCommentFormView from '../view/new-comment-form.js';
import {RenderPosition, render, replace, remove} from '../utils/render.js';
import {Mode, UserAction, UpdateType} from '../utils/const.js';

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
    this._handleDeleteClick = this._handleDeleteClick.bind(this);

    this._escKeyDownHandler =  this._escKeyDownHandler.bind(this);
    this._filmClickHandler = this._filmClickHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmComponent = new FilmView(film);
    this._popupComponent = new PopupView();
    this._filmDetailsComponent = new FilmDetailsView(film);
    this._commentListComponent = new CommentListView(film);
    this._newCommentComponent = new NewCommentFormView(film);

    this._popupComponent.getElement().appendChild(this._filmDetailsComponent.getElement());
    this._popupComponent.getElement().appendChild(this._commentListComponent.getElement());
    this._commentListComponent.getElement().appendChild(this._newCommentComponent.getElement());

    this._filmComponent.setFilmClickHandler(this._filmClickHandler);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmDetailsComponent.setCloseClickHandler(this._closeClickHandler);
    this._filmDetailsComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._commentListComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevFilmComponent === null || prevPopupComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filmComponent, prevFilmComponent);

    if (this._mode === Mode.OPENED) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._popupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removePopup();
    }
  }

  _removeHideOverflow() {
    const siteBodyElement = document.querySelector('body');
    siteBodyElement.classList.remove('hide-overflow');
  }

  _renderPopup() {
    const siteBodyElement = document.querySelector('body');

    siteBodyElement.appendChild(this._popupComponent.getElement());
    siteBodyElement.classList.add('hide-overflow');

    document.addEventListener('keydown', this._escKeyDownHandler);

    this._changeMode();
    this._mode = Mode.OPENED;
  }

  _removePopup() {
    const siteBodyElement = document.querySelector('body');

    siteBodyElement.removeChild(this._popupComponent.getElement());

    document.removeEventListener('keydown', this._escKeyDownHandler);

    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._newCommentComponent.reset(this._film);
      this._removePopup();
      this._removeHideOverflow();
    }
  }

  _filmClickHandler() {
    this._renderPopup();
  }

  _closeClickHandler() {
    this._removePopup();
    this._removeHideOverflow();
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
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
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
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
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleDeleteClick(evt) {
    this._changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          comment: {
            id: evt.target.id,
          },
        },
      ),
    );
  }
}
