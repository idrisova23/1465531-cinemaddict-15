import AbstractObserver from '../utils/abstract-observer.js';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(films) {
    this._films = films.slice();
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    const filmIndex = this._films.findIndex((film) => film.id === update.id);

    const updatedFilm = {
      ...this._films[filmIndex],
      comment: [
        update.newComment,
        ...this._films[filmIndex].comment,
      ],
    };

    this._films = [
      ...this._films.slice(0, filmIndex),
      updatedFilm,
      ...this._films.slice(filmIndex + 1),
    ];

    this._notify(updateType, updatedFilm);
  }

  deleteComment(updateType, update) {
    const filmIndex = this._films.findIndex((film) => film.id === update.id);
    const commentIndex = this._films[filmIndex].comment.findIndex((comment) => comment.id === update.comment.id);

    if (commentIndex === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    const updatedFilm = {
      ...this._films[filmIndex],
      comment: [
        ...this._films[filmIndex].comment.slice(0, commentIndex),
        ...this._films[filmIndex].comment.slice(commentIndex + 1),
      ],
    };

    this._films = [
      ...this._films.slice(0, filmIndex),
      updatedFilm,
      ...this._films.slice(filmIndex + 1),
    ];

    this._notify(updateType, updatedFilm);
  }
}