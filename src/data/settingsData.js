let volumeValue = 0;
let isTimerOn = false;
let timerValue = 20;
export const getVolumeValue = () => {
	return volumeValue;
};
export const setVolumeValue = (value) => {
	return (volumeValue = value);
};
export const getIsTimerOn = () => {
	return isTimerOn;
};
export const setIsTimerOn = (value) => {
	return (isTimerOn = value);
};
export const getTimerValue = () => {
	return timerValue;
};
export const setTimerValue = (value) => {
	return (timerValue = value);
};
export const changeStyleInput = (elem) => {
	const percentPlayerValue = (elem.value * 100) / elem.max;
	elem.style.background = `linear-gradient(to right, #e7fc0b 0%, #e7fc0b ${percentPlayerValue}%, #CDCDCD ${percentPlayerValue}%, #CDCDCD 100%`;
};
