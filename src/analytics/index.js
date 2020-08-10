import "../pages/analytics.css";
import DataStorage from "../js/modules/DataStorage";
import formatAnalyticsDate from "../js/utils/formatAnalyticsDate";
import formatDate from "../js/utils/formatDate";
import Statistics from "../js/components/Statistics";


const data = new DataStorage();
const statisticsTable = document.querySelector('.table');
const statisticsContainer = document.querySelector('.statistics');
const statistics = new Statistics(statisticsContainer, statisticsTable, formatAnalyticsDate, formatDate, data.getNews, data.getSearchRequest);

statistics.setTableDates();
statistics.setTableResults();
statistics.setGeneralStatistics();
