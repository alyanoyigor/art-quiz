import ResultModalHTML from './index.html';
import { createHtmlElement } from 'utils/helper';
import './index.scss';

export const ResultModal = ({ points, goToCategories, goToNextRound }) => {
	const resultModal = createHtmlElement(ResultModalHTML);
	resultModal.querySelector('.result-modal__points').textContent = points;
	resultModal
		.querySelector('.result-modal__categories-button')
		.addEventListener('click', goToCategories);
	resultModal
		.querySelector('.result-modal__next-round-button')
		.addEventListener('click', goToNextRound);
	return resultModal;
};
