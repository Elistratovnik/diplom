import "../pages/analytics.css";
import DataStorage from "../js/modules/DataStorage";
import formatAnalyticsDate from "../js/utils/formatAnalyticsDate";
import formatDate from "../js/utils/formatDate";
import Statistics from "../js/components/Statistics";

(function() {
const storage = new DataStorage();
const statisticsTable = document.querySelector('.table');
const statisticsContainer = document.querySelector('.statistics');
const statistics = new Statistics(statisticsContainer,
                                  statisticsTable,
                                  formatAnalyticsDate,
                                  formatDate,
                                  storage.getNews,
                                  storage.getSearchRequest)

statistics.setTableDates();

if (storage.getNews() && storage.getSearchRequest()) {
  statistics.setTableResults();
  statistics.setGeneralStatistics();
}
})();
