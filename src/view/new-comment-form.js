import dayjs from 'dayjs';
import he from 'he';
import {nanoid} from 'nanoid';
import SmartView from './smart.js';

const createNewCommentFormTemplate = (data) => {
  const {emotion, text} = data;
  const isChecked = (value) => value === emotion ? 'checked' : '';

  return `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">
      <img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode(text)}</textarea>
    </label>

    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${isChecked('smile')}>
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${isChecked('sleeping')}>
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${isChecked('puke')}>
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${isChecked('angry')}>
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>
    </div>
  </div>`;
};

export default class NewCommentForm extends SmartView {
  constructor(film) {
    super();
    this._data = NewCommentForm.parseFilmToData(film);

    this._newEmotionToggleHandler = this._newEmotionToggleHandler.bind(this);
    this._newTextInputHandler = this._newTextInputHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(film) {
    this.updateData(
      NewCommentForm.parseFilmToData(film),
    );
  }

  getTemplate() {
    return createNewCommentFormTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _newEmotionToggleHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this.updateData({
      emotion: evt.target.value,
    });
  }

  _newTextInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      text: evt.target.value,
    }, true);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('click', this._newEmotionToggleHandler);
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._newTextInputHandler);
  }

  _formSubmitHandler(evt) {
    if (evt.key !== 'Enter' && evt.key !== '13' && (!evt.metaKey || !evt.ctrlKey)) {
      return;
    }

    this._callback.formSubmit(NewCommentForm.parseDataToFilm(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('.film-details__comment-input').addEventListener('keydown', this._formSubmitHandler);
  }

  static parseFilmToData(film) {
    return Object.assign(
      {},
      film,
      {
        emotion: 'smile',
        text: '',
      },
    );
  }

  static parseDataToFilm(data) {
    data = Object.assign(
      {},
      data,
      {
        comments: [
          {
            id: nanoid(),
            emotion: data.emotion,
            date: dayjs.between('2019-06-10', '2021-03-02'),
            author: 'Author',
            comment: data.text,
          },
          ...data.comments,
        ],
      },
    );

    data.emotion = 'smile';
    data.text = '';

    delete data.emotion;
    delete data.text;

    return data;
  }
}
