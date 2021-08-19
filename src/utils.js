export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFloat = (min, max, point) => {
  if (min >= 0 && max > min && point > 0) {
    const rand = min + Math.random() * (max - min);
    return rand.toFixed(point);
  }

  return -1;
};

export const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];

export const generateUniqArray = (array, indexFrom, indexTo, separator = ', ') => {
  const randomIndexes = new Array(getRandomInteger(indexFrom, indexTo)).fill(null).map(() => array[getRandomInteger(0, array.length - 1)]);

  const mySet = new Set(randomIndexes);
  const uniqArray = Array.from(mySet);

  return uniqArray.join(separator);
};

export const fancyTimeFormat = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  let duration = '';
  if (hours > 0) {
    duration += `${hours}h ${mins < 10 ? '0' : ''}`;
    duration += `${mins}m `;
  } else {
    duration += `${mins}m `;
  }

  return duration;
};
