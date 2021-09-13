import he from 'he';
import AbstractView from './abstract.js';

const createCommentList = (comments) => {
  let commentsList = '';

  for (let i = 0; i < comments.length; i++) {
    commentsList += `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comments[i].emotion}.png" width="55" height="55" alt="emoji-${comments[i].emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comments[i].comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comments[i].author}</span>
        <span class="film-details__comment-day">${comments[i].date.format('YYYY/MM/DD hh:mm')}</span>
        <button class="film-details__comment-delete" id="${comments[i].id}">Delete</button>
      </p>
    </div>
  </li>`;
  }

  return commentsList;
};

const createCommentListTemplate = (film) => {
  const {comments} = film;
  const commentsList = createCommentList(comments);

  return `<div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      <ul class="film-details__comments-list">
        ${commentsList}
      </ul>
    </section>
  </div>`;
};

export default class CommentList extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  getTemplate() {
    return createCommentListTemplate(this._film);
  }

  restoreHandlers() {
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(evt);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelectorAll('.film-details__comment-delete').forEach((button) => button.addEventListener('click', this._deleteClickHandler));
  }
}
