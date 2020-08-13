import 'swiper/swiper-bundle.css';
import "../pages/about.css";
import Swiper, { Navigation, Pagination } from 'swiper';
import CommitSlide from '../js/components/CommitSlide';
import CommitSlideList from '../js/components/CommitSlideList';
import formatCardDate from '../js/utils/formatCardDate';
import GithubApi from '../js/modules/GithubApi';
import VariableContainer from '../js/components/VariableContainer';
import GITHUB_API_URL from '../js/constants/GITHUB_API_URL';
import SLIDER_OBJECT_OPTIONS from '../js/constants/SLIDER_OBJECT_OPTIONS';

Swiper.use([Navigation, Pagination]);
const gitApi = new GithubApi(GITHUB_API_URL);

const commitsSection = document.querySelector('.commits');
const spinner = document.querySelector('#load');
const errorField = document.querySelector('#error');
const commitsVariableContainer = new VariableContainer(commitsSection);

const slideTemplate = document.querySelector('#slide').content;
const slidesContainer = document.querySelector('.swiper-wrapper');
const createSlideItem = (...arg) => new CommitSlide(...arg);
const slideList = new CommitSlideList(slidesContainer, createSlideItem, slideTemplate, formatCardDate, gitApi.getData)

commitsVariableContainer.renderElement(spinner);
gitApi.getData()
  .then((commitsArr) => {
    commitsVariableContainer.showChilds();
    slideList.renderSlides(commitsArr, 20);
    const mySwiper = new Swiper('.swiper-container', SLIDER_OBJECT_OPTIONS)
  })
  .catch((err) => {
    commitsVariableContainer.renderElement(errorField, err);
  })

