import QuestionHTML from './index.html';
import { createHtmlElement } from '../../utils/utils';
import { categoryPages } from 'data/categoriesData';
import './index.scss';

export const QuestionPage = ({ questionText, imageURL, categoryName }) => {
  const questionPage = createHtmlElement(QuestionHTML);
  questionPage.querySelector('.question').textContent = questionText;
  const img = questionPage.querySelector('.question__image');
  const buttons = questionPage.querySelectorAll('.answer-button');

  switch (categoryName) {
    case categoryPages.categoryArtists:
      buttons.forEach((btn) => btn.classList.remove('answer-button-picture'));
      img.classList.remove('question__image_pictures');
      img.style.backgroundImage = `url(${imageURL})`;
      break;
    case categoryPages.categoryPictures:
      buttons.forEach((btn) => btn.classList.add('answer-button-picture'));
      img.classList.add('question__image_pictures');
      break;
    default:
      break;
  }

  return questionPage;
};
