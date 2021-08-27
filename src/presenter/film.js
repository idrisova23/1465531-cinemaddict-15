import FilmView from '../view/film.js';
import PopupView from '../view/popup.js';
import FilmDetailsView from '../view/film-details.js';
import CommentListView from '../view/comment-list.js';
import NewCommentFormView from '../view/new-comment-form.js';
import {RenderPosition, render} from '../utils/render.js';

const siteBodyElement = document.querySelector('body');

export default class Film {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;

    this._filmComponent = null;
    this._popupComponent = null;
    this._filmDetailsComponent = null;
    this._commentListComponent = null;
    this._newCommentComponent = null;

    this._escKeyDownHandler =  this._escKeyDownHandler.bind(this);
    this._filmClickHandler = this._filmClickHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
  }

  init(film) {
    this._film = film;

    this._filmComponent = new FilmView(film);
    this._popupComponent = new PopupView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);
    this._commentListComponent = new CommentListView(film);
    this._newCommentComponent = new NewCommentFormView(film);

    this._filmComponent.setFilmClickHandler(this._filmClickHandler);
    this._filmDetailsComponent.setCloseClickHandler(this._closeClickHandler);

    render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _showPopup() {
    siteBodyElement.appendChild(this._popupComponent.getElement());
    this._popupComponent.getElement().appendChild(this._filmDetailsComponent.getElement());
    this._popupComponent.getElement().appendChild(this._commentListComponent.getElement());
    this._commentListComponent.getElement().appendChild(this._newCommentComponent.getElement());

    siteBodyElement.classList.add('hide-overflow');

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _closePopup() {
    siteBodyElement.removeChild(this._popupComponent.getElement());
    siteBodyElement.classList.remove('hide-overflow');
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
}
