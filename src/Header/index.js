import HeaderHTML from './index.html';
import { createHtmlElement } from 'utils/helper';
import './index.scss';

export const Header = () => createHtmlElement(HeaderHTML);
