import 'swiper/swiper-bundle.css';
import "../pages/about.css";
import Swiper, { Navigation, Pagination } from 'swiper';
import CommitSlide from '../js/components/CommitSlide';
import CommitSlideList from '../js/components/CommitSlideList';
import formatCardDate from '../js/utils/formatCardDate';
import GithubApi from '../js/modules/GithubApi';
import VariableContainer from '../js/components/VariableContainer';

Swiper.use([Navigation, Pagination]);
const commitsSection = document.querySelector('.commits');
const spinner = document.querySelector('#load');
const commitsVariableContainer = new VariableContainer(commitsSection);
const gitApi = new GithubApi('https://api.github.com/repos/Elistratovnik/diplom/commits');
const slideTemplate = document.querySelector('#slide').content;
const createSlideItem = (...arg) => new CommitSlide(...arg);
const slideList = new CommitSlideList(document.querySelector('.swiper-wrapper'), createSlideItem, slideTemplate, formatCardDate, gitApi.getData)

commitsVariableContainer.renderElement(spinner);
gitApi.getData()
  .then((commitsArr) => {
    commitsVariableContainer.showChilds();
    slideList.renderSlides(commitsArr, 10);
    const mySwiper = new Swiper('.swiper-container', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 40,
      breakpoints: {
        680: {
          spaceBetween: 8,
        },

        768: {
          slidesPerView: 2,
          loop: false,
          spaceBetween: 8,
          centeredSlides: false,
        },

        1000: {
          slidesPerView: 3,
          centeredSlides: true,
          spaceBetween: 16,
        }
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  })
