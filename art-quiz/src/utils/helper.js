export const createHtmlElement = (htmlString) => {
	const template = document.createElement('template');
	template.innerHTML = htmlString;
	return template.content.firstChild;
};
