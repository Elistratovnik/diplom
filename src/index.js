import "./pages/index.css";
import SearchInput from "./js/components/SearchInput";
import NewsApi from "./js/modules/NewsApi";
import createNewsUrl from "./js/utils/createNewsUrl";
import formatDate from "./js/utils/formatDate";
import NewsCard from "./js/components/NewsCard";
import NewsCardList from "./js/components/NewsCardList";
import DataStorage from "./js/modules/DataStorage";
import formatCardDate from "./js/utils/formatCardDate";

const errorMessages = {
  valueMissing: 'Нужно ввести ключевое слово',
  tooShort: 'Должно быть от 2 до 30 символов',
  typeMismatch: 'Здесь должна быть ссылка'
}

const searchForm = document.forms.search;
const searchButton = searchForm.button;
const newsApi = new NewsApi();

const searchInput = new SearchInput(searchForm.input,
                                    searchButton,
                                    errorMessages,
                                    document.querySelector('.search-field__error'));

const section = document.querySelector('.news');
const sectionHeader = document.querySelector('.news__header');
const sectionCards = document.querySelector('.cards');
const spinner = document.querySelector('.load');
const notFound = document.querySelector('.not-found');
const storage = new DataStorage();

const cardTemplate = document.querySelector('#card').content;
const createCardItem = (...arg) => new NewsCard(...arg);
const newsList = new NewsCardList(document.querySelector('.cards__list'),
                                  createCardItem,
                                  cardTemplate,
                                  document.querySelector('.cards__button'),
                                  storage.getNews,
                                  formatCardDate);

function searchNews () {
  event.preventDefault();
  if (!searchInput.validate()) return console.log('Поле не валидно');
  searchForm.reset();
  newsList.resetList();
  const nowDate = formatDate(new Date());
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 6);
  console.log(nowDate, formatDate(endDate));
  const url = createNewsUrl(searchInput.getValue(), formatDate(endDate), nowDate);
  newsApi.setUrl(url);
  section.style.display = 'block';
  spinner.style.display = 'flex';
  sectionHeader.style.display = 'none';
  sectionCards.style.display = 'none';
  notFound.style.display = 'none';
  newsApi.getNews()
    .then((res) => {
      if (res.articles.length === 0) {
        return Promise.reject('not-found');
      }
      return res;
    })
    .then((res) => {
      storage.setNews(res);
      storage.setSearchRequest(searchInput.getValue());
      sectionHeader.style.display = 'flex';
      sectionCards.style.display = 'block';
      newsList.trippleCard(res.articles);
    })
    .catch((res) => {
      if(res === 'not-found') {
        notFound.style.display = 'block';
      } else {
        console.log(res);
      }
    })
    .finally(() => {
      spinner.style.display = 'none';
    })
}

searchForm.addEventListener('submit', searchNews);


