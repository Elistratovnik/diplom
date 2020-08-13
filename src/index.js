import "./pages/index.css";
import SearchInput from "./js/components/SearchInput";
import NewsApi from "./js/modules/NewsApi";
import createNewsUrl from "./js/utils/createNewsUrl";
import formatDate from "./js/utils/formatDate";
import NewsCard from "./js/components/NewsCard";
import NewsCardList from "./js/components/NewsCardList";
import DataStorage from "./js/modules/DataStorage";
import formatCardDate from "./js/utils/formatCardDate";
import VariableContainer from "./js/components/VariableContainer";
import createXDateAgo from "./js/utils/createXDateAgo";
import INPUT_ERROR_MESSAGES from "./js/constants/INPUT_ERROR_MESSAGES";
import SearchInputValidator from "./js/components/SearchInputValidator";

const searchForm = document.querySelector('.search-field');
const searchInputField = searchForm.querySelector('.search-field__input');
const searchButton = searchForm.querySelector('.search-field__button');
const searchError = searchForm.querySelector('.search-field__error');
const newsApi = new NewsApi();
const storage = new DataStorage();

const searchInput = new SearchInput(searchInputField, searchButton);
const searchInputValidator = new SearchInputValidator(searchInputField, searchButton, INPUT_ERROR_MESSAGES, searchError);

const newsSection = document.querySelector('.news');
const notFound = document.querySelector('#not-found');
const spinner = document.querySelector('#load');
const errorField = document.querySelector('#error');
const newsVariableContainer = new VariableContainer(newsSection);

const cardTemplate = document.querySelector('#card').content;
const createCardItem = (...arg) => new NewsCard(...arg);
const cardsList = document.querySelector('.cards__list');
const cardsButton = document.querySelector('.cards__button');
const newsList = new NewsCardList(cardsList,
                                  createCardItem,
                                  cardTemplate,
                                  cardsButton,
                                  storage.getNews,
                                  formatCardDate);

function searchNews () {
  event.preventDefault();
  if (!searchInputValidator.validate()) return console.log('Поле не валидно');
  searchInputValidator.buttonDisable();
  newsList.resetList();
  newsVariableContainer.showContainer();
  newsVariableContainer.renderElement(spinner);
  const nowDate = formatDate(new Date());
  const endDate = formatDate(createXDateAgo(6));
  const url = createNewsUrl(searchInput.getValue(), endDate, nowDate);
  newsApi.setUrl(url);
  newsApi.getNews()
    .then((res) => {
      if (res.articles.length === 0) return Promise.reject('not-found');
      newsVariableContainer.showChilds();
      storage.setNews(res);
      storage.setSearchRequest(searchInput.getValue());
      newsList.trippleCard(res.articles);
    })
    .catch((err) => {
      if(err === 'not-found') {
        newsVariableContainer.renderElement(notFound);
      } else {
        newsVariableContainer.renderElement(errorField, err);
      }
    })
    .finally(() => {
      searchInputValidator.setSubmitButtonState();
    })
}

function renderNews () {
  if (storage.getVisitDate() === formatDate(new Date())) {
    newsVariableContainer.showContainer();
    searchInput.setInputText(storage.getSearchRequest());
    newsList.trippleCard(storage.getNews().articles);
  }
}


newsVariableContainer.hideContainer();
renderNews();
searchForm.addEventListener('submit', searchNews);


