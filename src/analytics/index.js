import "../pages/analytics.css";
import DataStorage from "../js/modules/DataStorage";
import formatAnalyticsDate from "../js/utils/formatAnalyticsDate";
import formatDate from "../js/utils/formatDate";
import Statistics from "../js/components/Statistics";


const data = new DataStorage();
const statisticsTable = document.querySelector('.table');
const statistics = new Statistics(statisticsTable, formatAnalyticsDate, formatDate, data.getNews);

statistics.setTableDates();
statistics.setTableResults();

