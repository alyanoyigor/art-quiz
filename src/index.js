import { mainPage } from 'MainPage/index';
import { settingsPage } from 'SettingsPage/index';
import { getLastPage, pagesTransfer } from 'data/pagesTransfer';
import { Categories } from 'Categories/index';
import { categoryPages } from 'data/categoriesData';
import { createQuestions } from 'data/questionsData';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import 'styles/reset.scss';
import 'index.scss';

const content = document.querySelector('.content');
content.append(mainPage);

const settingsMainButton = mainPage.querySelector('.main-settings-button');
settingsMainButton.addEventListener('click', () => {
	pagesTransfer(mainPage, settingsPage);
});

const categoryCreator = (value) => {
	return Categories({
		categoryName: categoryPages[value],
		dataFunc: () => createQuestions(categoryPages[value]),
	});
};

const highlight = (target, selector, selectedElement) => {
	let element = selectedElement.querySelector('.nav__link_active');
	if (element) {
		element.classList.remove(selector);
	}
	element = target;
	element.classList.add(selector);
};

const categoryArtists = categoryCreator('categoryArtists');
const categoryPictures = categoryCreator('categoryPictures');
const [mainCardArtist, mainCardPicture] =
	mainPage.querySelectorAll('.main-card');
mainCardArtist.addEventListener('click', () => {
	pagesTransfer(mainPage, categoryArtists);
	highlight(
		categoryArtists.querySelector('#categories'),
		'nav__link_active',
		categoryArtists
	);
});
mainCardPicture.addEventListener('click', () => {
	pagesTransfer(mainPage, categoryPictures);
	highlight(
		categoryPictures.querySelector('#categories'),
		'nav__link_active',
		categoryPictures
	);
});

const adjustCategory = (category) => {
	const settingsCategoriesButton = category.querySelector(
		'.main-settings-button'
	);
	const fromCategoriesToMain = category.querySelector('#main');
	const fromCategoriesToScore = category.querySelector('#score');
	category.addEventListener('click', (e) => {
		if (e.target.closest('a')) {
			const target = e.target.closest('a');
			highlight(target, 'nav__link_active', category);
		}
	});
	fromCategoriesToMain.addEventListener('click', () => {
		pagesTransfer(category, mainPage);
	});
	settingsCategoriesButton.addEventListener('click', () => {
		pagesTransfer(category, settingsPage);
	});
};

adjustCategory(categoryArtists);
adjustCategory(categoryPictures);

const closeSettingsButton = settingsPage.querySelector(
	'.close-settings-button'
);
closeSettingsButton.addEventListener('click', () => {
	pagesTransfer(settingsPage, getLastPage());
});
