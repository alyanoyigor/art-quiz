let lastPage = null;
export const setLastPage = (page) => {
	lastPage = page;
}
export const getLastPage = () => {
	return lastPage;
}
export const pagesTransfer = (from, to) => {
	setLastPage(from);
	from.remove();
	to ? document.querySelector('.content').append(to) : null;
}
