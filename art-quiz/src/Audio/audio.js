import { getVolumeValue } from 'data/settingsData';

export const playAudio = (elem) => {
	const cloneNode = elem.cloneNode(true);
	cloneNode.volume = getVolumeValue();
	cloneNode.play();
}
