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

const newsSection = document.querySelector('.news');
const storage = new DataStorage();

const notFound = document.querySelector('#not-found');
const spinner = document.querySelector('#load');
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
  if (!searchInput.validate()) return console.log('Поле не валидно');
  searchInput.buttonDisable();
  newsList.resetList();
  newsVariableContainer.showContainer();
  newsVariableContainer.renderElement(spinner);
  const nowDate = formatDate(new Date());
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 6);
  const url = createNewsUrl(searchInput.getValue(), formatDate(endDate), nowDate);
  newsApi.setUrl(url);
  newsApi.getNews()
    .then((res) => {
      if (res.articles.length === 0) return Promise.reject('not-found');
      newsVariableContainer.showChilds();
      storage.setNews(res);
      storage.setSearchRequest(searchInput.getValue());
      newsList.trippleCard(res.articles);
    })
    .catch((res) => {
      if(res === 'not-found') {
        newsVariableContainer.renderElement(notFound);
      } else {
        console.log(res);
      }
    })
    .finally(() => {
      searchInput.setSubmitButtonState();
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


