import { getVolumeValue } from '../data/settingsData';

export const createHtmlElement = (htmlString) => {
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  return template.content.firstChild;
};

export const playAudio = (elem) => {
  const cloneNode = elem.cloneNode(true);
  cloneNode.volume = getVolumeValue();
  cloneNode.play();
};
