export const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

export const SortType = {
  DEFAULT: 'default',
  DATE_DOWN: 'date-down',
  RATING_DOWN: 'rating-down',
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
  STATS: 'stats',
};

export const MenuItem = {
  FILMS: 'FILMS',
  STATS: 'STATS',
};

export const Genre = {
  SCI_FI: 'Sci-Fi',
  ANIMATION: 'Animation',
  FANTASY: 'Fantasy',
  COMEDY: 'Comedy',
  TV_SERIES: 'TV Series',
};

export const GENRES = Object.values(Genre);

export const BAR_HEIGHT = 50;
