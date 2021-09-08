import SmartView from './smart.js';

const createNewCommentFormTemplate = (data) => {
  const {emotion, text} = data;
  const isChecked = (emoji) => emoji === emotion;

  return `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">
      <img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text}</textarea>
    </label>

    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked=${isChecked('smile')}>
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" checked=${isChecked('sleeping')}>
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" checked=${isChecked('puke')}>
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" checked=${isChecked('angry')}>
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

    this._setInnerHandlers();
  }

  reset(film) {
    this.updateData(
      NewCommentForm.parseTaskToData(film),
    );
  }

  getTemplate() {
    return createNewCommentFormTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
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
    evt.preventDefault();
    // TODO: добавить проверку на Ctrl+Enter
    if (evt.key !== 'Enter' && evt.key !== '13') {
      return;
    }
    this._callback.formSubmit(NewCommentForm.parseDataToFilm(this._data));
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

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    document.addEventListener('keydown', this._formSubmitHandler);
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
    data = Object.assign({}, data);

    data.emotion = 'smile';
    data.text = '';

    delete data.emotion;
    delete data.text;

    return data;
  }
}
