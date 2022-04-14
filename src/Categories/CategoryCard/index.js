import CategoryCardHTML from './index.html';
import { createHtmlElement } from '../../utils/helper';
import './index.scss';

export const CategoryCard = ({
	id,
	numberRound,
	result,
	imageURL,
	goToQuestions,
}) => {
	const categoryCard = createHtmlElement(CategoryCardHTML);
	categoryCard.id = id;
	categoryCard.querySelector(
		'.category-card__label'
	).textContent = `Round ${numberRound}`;
	categoryCard.querySelector(
		'.category-card__result'
	).textContent = `${result}`;
	categoryCard.querySelector(
		'.category-card__img'
	).style.backgroundImage = `url(${imageURL})`;
	categoryCard.addEventListener('click', goToQuestions);
	return categoryCard;
};
