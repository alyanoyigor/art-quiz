import CategoriesHTML from './index.html';
import { createHtmlElement } from 'utils/helper';
import { CategoryCard } from './CategoryCard';
import { QuestionPage } from 'Question';
import { pagesTransfer } from 'data/pagesTransfer';
import { AnswerModal } from 'AnswerModal';
import { ResultModal } from 'ResultModal';
import {
	changeStyleInput,
	getIsTimerOn,
	getTimerValue,
} from 'data/settingsData';
import { playAudio } from 'Audio/audio';
import { categoryPages } from 'data/categoriesData';
import { Navigation } from 'Navigation';
import { Header } from 'Header';
import './index.scss';

export const Categories = ({ categoryName, dataFunc }) => {
	const categories = createHtmlElement(CategoriesHTML);
	categories.prepend(Header());
	categories.append(Navigation());

	const categoriesContainer = categories.querySelector('.categories-container');

	let questionCounter = 0;
	let round = null;
	let availableQuestions = [];
	let allQuestions = [];
	let currentPage = categories;
	let results = [];
	let playedCardsId = [];
	if (localStorage.getItem(`played-cards-${categoryName}`)) {
		playedCardsId = localStorage
			.getItem(`played-cards-${categoryName}`)
			.split(',');
	}

	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	};

	const getNewQuestion = () => {
		if (questionCounter > availableQuestions.length - 1) {
			const result = results.filter((item) => item === true).length;
			const resultModal = ResultModal({
				points: result,
				goToCategories: () => pagesTransfer(currentPage, categories),
				goToNextRound: () =>
					pagesTransfer(currentPage, startGame(allQuestions, (round += 1))),
			});
			playAudio(document.querySelector('#audio-win'));
			const curCard = categories.querySelector(`[id='${(round + 1) * 10}']`);
			curCard.querySelector('.category-card__result').textContent = result;
			curCard
				.querySelector('.category-card__img')
				.classList.remove('not-touched');
			if (!playedCardsId.includes(curCard.id)) {
				playedCardsId.push(curCard.id);
			}
			currentPage.querySelector('.answer-modal__content').remove();
			results = [];
			return currentPage.append(resultModal);
		}

		const curObjAnswers = availableQuestions[questionCounter];
		let questionPage;
		switch (categoryName) {
			case categoryPages.categoryArtists:
				questionPage = QuestionPage({
					imageURL: `https://raw.githubusercontent.com/alyanoyigor/image-data/master/full/${curObjAnswers.answer.imageNum}full.jpg`,
					questionText: `Кто автор данной картины?`,
					categoryName,
				});
				break;
			case categoryPages.categoryPictures:
				questionPage = QuestionPage({
					imageURL: null,
					questionText: `Какую картину нарисовал ${curObjAnswers.answer.author}?`,
					categoryName,
				});
				break;
			default:
				break;
		}

		let intervalNumber = null;
		let intervalInput = null;

		if (getIsTimerOn()) {
			questionPage.querySelector('.timer-container').style.display = 'flex';
			const timerInput = questionPage.querySelector('.timer__duration');
			const timerNumber = questionPage.querySelector('.timer__number');

			timerNumber.textContent = getTimerValue();
			timerInput.max = timerNumber.textContent;
			timerInput.value = timerNumber.textContent;

			let timerNumberValue = getTimerValue(),
				newTimer = getTimerValue();
			const changeInputValue = () => {
				newTimer -= timerInput.step;
				timerInput.value = newTimer;
				changeStyleInput(timerInput);
			};
			const changeTimerValue = () => {
				timerNumberValue--;
				if (timerNumberValue < 0) {
					timerNumberValue = 0;
					newTimer = 0;
					clearIntervals();
					showAnswerModal(null);
					return;
				}
				timerNumber.textContent = timerNumberValue;
			};
			intervalNumber = setInterval(changeTimerValue, 1000);
			intervalInput = setInterval(changeInputValue, 10);
		}

		const resultsHTML = questionPage.querySelectorAll('.question-result');
		resultsHTML.forEach((item, i) => {
			switch (results[i]) {
				case true:
					item.classList.add('question-result_true');
					break;
				case false:
					item.classList.add('question-result_false');
					break;
				default:
					break;
			}
		});

		pagesTransfer(currentPage, questionPage);

		const answerButtons = questionPage.querySelectorAll('.answer-button');
		answerButtons.forEach((answerButton) => {
			switch (categoryName) {
				case categoryPages.categoryArtists:
					answerButton.textContent =
						curObjAnswers[`choice${answerButton.id}`].author;
					break;
				case categoryPages.categoryPictures:
					answerButton.style.backgroundImage = `url(https://raw.githubusercontent.com/alyanoyigor/image-data/master/img/${
						curObjAnswers[`choice${answerButton.id}`].imageNum
					}.jpg)`;
					break;
				default:
					break;
			}
			answerButton.addEventListener('click', function () {
				showAnswerModal(this);
				clearIntervals();
			});
		});

		const clearIntervals = () => {
			clearInterval(intervalInput);
			clearInterval(intervalNumber);
		};

		const checkAnswer = (elem) => {
			const selectedChoice = elem,
				answer = curObjAnswers['answer'];

			let isRightAnswer = null;
			switch (categoryName) {
				case categoryPages.categoryArtists:
					if (selectedChoice?.textContent === answer.author) {
						isRightAnswer = true;
					} else {
						isRightAnswer = false;
					}
					results.push(isRightAnswer);
					break;
				case categoryPages.categoryPictures:
					if (
						selectedChoice?.style?.backgroundImage ===
						`url("https://raw.githubusercontent.com/alyanoyigor/image-data/master/img/${answer.imageNum}.jpg")`
					) {
						isRightAnswer = true;
					} else {
						isRightAnswer = false;
					}
					results.push(isRightAnswer);
					break;
				default:
					break;
			}

			return isRightAnswer;
		};
		const showAnswerModal = (elem) => {
			const isCorrectAnswer = checkAnswer(elem);
			const answerModal = AnswerModal({
				pictureName: curObjAnswers['answer'].name,
				author: curObjAnswers['answer'].author,
				year: curObjAnswers['answer'].year,
				imageURL: `https://raw.githubusercontent.com/alyanoyigor/image-data/master/img/${curObjAnswers['answer'].imageNum}.jpg`,
				isRightAnswer: isCorrectAnswer,
				nextQuestion: getNewQuestion,
			});
			if (isCorrectAnswer) {
				playAudio(document.querySelector('#audio-correct'));
			} else {
				playAudio(document.querySelector('#audio-wrong'));
			}
			questionPage.append(answerModal);
			questionCounter++;
		};

		const buttonsTextAuthors = [];
		switch (categoryName) {
			case categoryPages.categoryArtists:
				answerButtons.forEach((item) =>
					buttonsTextAuthors.push(item.textContent)
				);
				shuffleArray(buttonsTextAuthors);
				answerButtons.forEach(
					(item, i) => (item.textContent = buttonsTextAuthors[i])
				);
				break;
			case categoryPages.categoryPictures:
				answerButtons.forEach((item) =>
					buttonsTextAuthors.push(item.style.backgroundImage)
				);
				shuffleArray(buttonsTextAuthors);
				answerButtons.forEach(
					(item, i) => (item.style.backgroundImage = buttonsTextAuthors[i])
				);
				break;
			default:
				break;
		}

		const closeQuestion = questionPage.querySelector('.close-question-button');
		closeQuestion.addEventListener('click', () => {
			currentPage = categories;
			results = [];
			clearIntervals();
			pagesTransfer(questionPage, categories);
		});

		currentPage = questionPage;
	};

	const startGame = (data, i) => {
		questionCounter = 0;
		round = i;
		if (!data[i]) return pagesTransfer(currentPage, categories);
		availableQuestions = [...data[i]];
		allQuestions = data;
		getNewQuestion();
	};

	const createCategories = async (callback) => {
		const data = await callback();
		let resultsRounds = null;
		if (localStorage.getItem(`results-rounds-${categoryName}`)) {
			resultsRounds = localStorage
				.getItem(`results-rounds-${categoryName}`)
				.split(',');
		}
		let count = 0;
		data.forEach((item, i) => {
			const categoryCard = CategoryCard({
				id: (count += 10),
				numberRound: i + 1,
				result: resultsRounds ? resultsRounds[i] : 0,
				imageURL: `https://raw.githubusercontent.com/alyanoyigor/image-data/master/img/${item[0].answer.imageNum}.jpg`,
				goToQuestions: () => {
					document.querySelector('.container').remove();
					startGame(data, i);
				},
			});
			playedCardsId.forEach((item) => {
				const cardImg = categoryCard.querySelector('.category-card__img');
				if (categoryCard.id === item) {
					cardImg.classList.remove('not-touched');
				}
			});
			categoriesContainer.append(categoryCard);
		});
	};
	createCategories(dataFunc);

	const getResults = () => {
		const resultsRounds = categories.querySelectorAll('.category-card__result');
		const resNum = [];
		resultsRounds.forEach((item) => resNum.push(item.textContent));
		return resNum;
	};

	const setLocalStorage = () => {
		localStorage.setItem(`results-rounds-${categoryName}`, getResults());
		localStorage.setItem(`played-cards-${categoryName}`, playedCardsId);
	};
	window.addEventListener('beforeunload', setLocalStorage);

	return categories;
};
