import SettingsPage from './index.html';
import { createHtmlElement } from 'utils/helper';
import {
	getIsTimerOn,
	setIsTimerOn,
	setTimerValue,
	getTimerValue,
	setVolumeValue,
	getVolumeValue,
	changeStyleInput,
} from 'data/settingsData';
import { playAudio } from 'Audio/audio';
import './index.scss';

export const settingsPage = createHtmlElement(SettingsPage);

if (localStorage.getItem('timer-bool')) {
	setIsTimerOn(localStorage.getItem('timer-bool') === 'false' ? false : true);
}
if (localStorage.getItem('volume-value')) {
	setVolumeValue(localStorage.getItem('volume-value'));
}
if (localStorage.getItem('timer-value')) {
	setTimerValue(localStorage.getItem('timer-value'));
}
const audioClick = document.querySelector('#audio-click');
const volumeDuration = settingsPage.querySelector('.volume__duration');
audioClick.volume = volumeDuration.value;
volumeDuration.addEventListener('input', function () {
	setVolumeValue(this.value);
	changeStyleInput(this);
});
volumeDuration.addEventListener('change', function () {
	playAudio(audioClick);
});

volumeDuration.value = getVolumeValue();
changeStyleInput(volumeDuration);

const setLocalStorage = () => {
	localStorage.setItem('timer-bool', getIsTimerOn());
	localStorage.setItem('volume-value', getVolumeValue());
	localStorage.setItem('timer-value', getTimerValue());
};
const checkbox = settingsPage.querySelector('.time-game-check__checkbox');

const changeTextCheckbox = (isTimeOn) => {
	const text = settingsPage.querySelector('.time-game-check__text');
	text.textContent = isTimeOn ? 'On' : 'Off';
};

checkbox.addEventListener('input', (e) => {
	const isChecked = e.target.checked;
	setIsTimerOn(isChecked);
	changeTextCheckbox(isChecked);
});
checkbox.checked = getIsTimerOn();
changeTextCheckbox(checkbox.checked);

const defaultSettingsButton = settingsPage.querySelector(
	'.default-settings-button'
);

defaultSettingsButton.addEventListener('click', (e) => {
	checkbox.checked = setIsTimerOn(false);
	volumeDuration.value = setVolumeValue(0);
	changeStyleInput(volumeDuration);
	timeAdjustNumber.value = setTimerValue(20);
	changeTextCheckbox(checkbox.checked);
});
const timeAdjustMinusButton = settingsPage.querySelector(
	'.time-game-adjust__button_minus'
);
const timeAdjustPlusButton = settingsPage.querySelector(
	'.time-game-adjust__button_plus'
);
const timeAdjustNumber = settingsPage.querySelector(
	'.time-game-adjust__number'
);
const TIME_STEP = 5;

timeAdjustNumber.value = getTimerValue();
timeAdjustMinusButton.addEventListener('click', function () {
	if (timeAdjustNumber.value === timeAdjustNumber.min) return;
	timeAdjustNumber.value -= TIME_STEP;
	setTimerValue(timeAdjustNumber.value);
});
timeAdjustPlusButton.addEventListener('click', function () {
	let number = Number(timeAdjustNumber.value);
	if (timeAdjustNumber.value === timeAdjustNumber.max) return;
	number += TIME_STEP;
	timeAdjustNumber.value = number;
	setTimerValue(timeAdjustNumber.value);
});

window.addEventListener('beforeunload', setLocalStorage);
