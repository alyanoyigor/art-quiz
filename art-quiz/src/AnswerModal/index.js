import AnswerModalHTML from './index.html';
import { createHtmlElement } from 'utils/helper';
import './index.scss';

export const AnswerModal = ({
	pictureName,
	author,
	year,
	imageURL,
	isRightAnswer,
	nextQuestion,
}) => {
	const answerModal = createHtmlElement(AnswerModalHTML);
	answerModal.querySelector('.answer-modal__picture-name').textContent =
		pictureName;

	answerModal.querySelector(
		'.answer-modal__author-year'
	).textContent = `${author}, ${year}`;

	answerModal.querySelector(
		'.answer-modal__image'
	).style.backgroundImage = `url(${imageURL})`;

	if (isRightAnswer) {
		answerModal.querySelector('#answer-true').classList.remove('hide');
		answerModal.querySelector('#answer-false').classList.add('hide');
	} else {
		answerModal.querySelector('#answer-true').classList.add('hide');
		answerModal.querySelector('#answer-false').classList.remove('hide');
	}
	answerModal
		.querySelector('.next-question-button')
		.addEventListener('click', nextQuestion);
	return answerModal;
};
